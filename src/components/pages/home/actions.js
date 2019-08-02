import { createAction } from 'redux-act';

export const setHomeDetails = createAction('BG_HOME_DEATILS_SET');

export const loadHomeDetail = contractNummer => dispatch => {
  fetch(`http://localhost:3000/api/home/overview/${contractNummer}`, {
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
    .then(json => {
      dispatch(setHomeDetails(json));
    });
};
