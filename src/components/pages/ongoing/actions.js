import { createAction } from 'redux-act';

const PAGINATION_THRESHOLD = 150;

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
      const tbodyFiltered = tableJson.tbody;
      const tbodyLength = tbodyFiltered.length;
      const needsPagination = tbodyLength >= PAGINATION_THRESHOLD;
      const finalBody = !needsPagination ? tbodyFiltered : tbodyFiltered.slice(0, PAGINATION_THRESHOLD)
      dispatch(setOriginalTableItems({
        thead: tableJson.thead,
        tbody: finalBody,
        needsPagination,
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

    dispatch(setTableItems({ thead: originalThead, tbody: finalBody, needsPagination, isSearching: false }));
  }, 300);
};
