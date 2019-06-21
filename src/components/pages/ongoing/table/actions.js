import { createAction } from 'redux-act';

const PAGINATION_THRESHOLD = 100;

export const setTableItems = createAction('BG_ONGOING_SEARCH_SET_ITEMS');
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
