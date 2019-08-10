import { createAction } from 'redux-act';

export const setFormItems = createAction('BG_SET_FORM_ITEMS');

export const loadFormData = () => (dispatch, getState) => {
  const {
    config: { config: { apiUrl } },
    authentication: { at },
  } = getState();

  fetch(`${apiUrl}/api/contract/form`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'authorization': at,
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
  })
    .then(response => {
      return response.json();
    })
    .then(myJson => {
      dispatch(setFormItems(myJson));
    });
};
