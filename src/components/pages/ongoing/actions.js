import { createAction } from 'redux-act';

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
    .then(myJson => {
      dispatch(setOriginalTableItems(myJson));
    });
};

const cleanedUp = (str = '') => str.trim().toLowerCase();


let timeStamp;

export const setSearch = (search) => (dispatch, getState) => {
  const {
    ongoing: { tableOriginalItems: { thead, tbody } },
  } = getState();
  clearTimeout(timeStamp);
  dispatch(setSearchValue(search));
  timeStamp = setTimeout(() => {
    const tbodyFiltered = tbody.filter(row => (
      !!row.find(cell => ~cleanedUp(cell.html).indexOf(cleanedUp(search)))
    ));
    if (!tbodyFiltered[0]) {
      tbodyFiltered.push([]);
    }
    dispatch(setTableItems({ thead, tbody: tbodyFiltered }));
  }, 400);
};
