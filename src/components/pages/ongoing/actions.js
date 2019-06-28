import { createAction } from 'redux-act';

import { PAGINATION_THRESHOLD, NEXT } from './_config';

export const setTableItems = createAction('BG_ONGOING_SEARCH_SET_ITEMS');
export const setSearchValue = createAction('BG_ONGOING_SEARCH_SET_VALUE');
export const setOriginalTableItems = createAction('BG_ONGOING_SEARCH_SET_ORIGINAL_ITEMS');

export const loadTableItems = () => (dispatch) => {
  fetch('http://localhost:3000/api/ongoing/items', {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
  })
    .then(response => {
      return response.json();
    })
    .then(tableJson => {
      tableJson.tbody = tableJson.tbody.map((row, rowIndex) => {
        const specialCell = row.find(cell => !!cell.interaction);
        if (specialCell) {
          const index = row.indexOf(specialCell);
          specialCell.html = `
            <axa-link href="/#/ongoing/${specialCell.interaction.type}/${rowIndex}/${index}">
              ${specialCell.html}
            </axa-link>
          `
          row[index] = specialCell;
          return row;
        }

        return row;
      });
      const tbodyFiltered = tableJson.tbody;
      const tbodyLength = tbodyFiltered.length;
      const needsPagination = tbodyLength >= PAGINATION_THRESHOLD;
      const finalBody = !needsPagination ? tbodyFiltered : tbodyFiltered.slice(0, PAGINATION_THRESHOLD)
      dispatch(setOriginalTableItems({
        thead: tableJson.thead,
        tbody: finalBody,
        needsPagination,
        rowLength: Math.floor(tbodyLength / PAGINATION_THRESHOLD),
        tableOriginalItems: tableJson
      }));
    });
};

const cleanedUp = (str = '') => str.trim().toLowerCase();

let timeStamp;

let originalThead = [];
let originalTbody = [];

// Main search action.
export const setSearch = (search) => (dispatch, getState) => {
  const {
    ongoing: { tableOriginalItems },
  } = getState();

  // Here we need to be out of Redux due to performance.
  // we cache original head and original body cause it will get deleted in "setSearchValue"
  // due to performance implications
  if (tableOriginalItems && tableOriginalItems.thead.length && tableOriginalItems.tbody.length) {
    const { thead, tbody } = tableOriginalItems;
    // cache and shallow clone thead and tbody outside redux store
    originalThead = [...thead];
    originalTbody = [...tbody];
  }

  // search and sync entered key with UI. This action will delete table model
  // due to performance
  dispatch(setSearchValue({ lastSearch: search, isSearching: true }));

  // debounce so that search only starts once we are sure user has finished with key input
  clearTimeout(timeStamp);
  timeStamp = setTimeout(() => {
    // filter with the enetered key for each cell in each row
    const tbodyFiltered = originalTbody.filter(row => (
      !!row.find(cell => ~cleanedUp(cell.html).indexOf(cleanedUp(search)))
    ));
    // if no body found, table sortables needs following structure:
    // tbody: [[]]. Here we create a empty table accordingly to the model needs
    if (!tbodyFiltered[0]) {
      tbodyFiltered.push([]);
    }
    const tbodyLength = tbodyFiltered.length;
    const needsPagination = tbodyLength >= PAGINATION_THRESHOLD;
    // show only rows within the current page
    const finalBody = !needsPagination ? tbodyFiltered : tbodyFiltered.slice(0, PAGINATION_THRESHOLD)

    dispatch(setTableItems({
      thead: originalThead,
      tbody: finalBody,
      rowLength: Math.floor(tbodyLength / PAGINATION_THRESHOLD),
      needsPagination,
      pageNumber: 0,
      isSearching: false
    }));
  }, 300);
};

export const handlePagination = (direction = NEXT) => (dispatch, getState) => {
  const {
    ongoing: {
      tableItems: { thead },
      tableOriginalItems: { tbody: tbodyOriginal },
      pageNumber,
      isSearching,
      rowLength
    },
  } = getState();
  const tbodyLength = tbodyOriginal.length;
  const needsPagination = tbodyLength >= PAGINATION_THRESHOLD;

  let newPage = pageNumber;
  if (direction === NEXT) {
    newPage = pageNumber < rowLength ? pageNumber + 1 : rowLength;
  } else {
    newPage = pageNumber > 1 ? pageNumber - 1 : 0;
  }
  // show only rows within the current page
  console.log(newPage * PAGINATION_THRESHOLD, PAGINATION_THRESHOLD + newPage * PAGINATION_THRESHOLD);
  const finalBody = !needsPagination ? tbodyOriginal : tbodyOriginal.slice(
    newPage * PAGINATION_THRESHOLD, PAGINATION_THRESHOLD + newPage * PAGINATION_THRESHOLD
  );

  // console.log(tbody);

  dispatch(setTableItems({
    thead,
    tbody: finalBody,
    rowLength: Math.floor(tbodyOriginal.length / PAGINATION_THRESHOLD),
    needsPagination,
    pageNumber: newPage,
    isSearching
  }));
}
