import { createAction } from 'redux-act';

export const setPoliceDetails = createAction('BG_ONGOING_POLICE_DEATILS_SET');

export const loadPoliceDetail = (contractNummer) => (dispatch) => {
  fetch(`http://localhost:3000/api/police-detail/values/${contractNummer}`, {
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
      dispatch(setPoliceDetails(json));
    });
};
