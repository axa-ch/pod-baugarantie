import { createAction } from 'redux-act';

export const setPoliceDetails = createAction('BG_ONGOING_POLICE_DEATILS_SET');

export const loadPoliceDetail = (contractNummer) => (dispatch, getState) => {
  const {
    config: { config: { apiUrl } },
    authentication: { at },
  } = getState();

  fetch(`${apiUrl}/api/contracts/${contractNummer}/police-detail`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'authorization': at
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
