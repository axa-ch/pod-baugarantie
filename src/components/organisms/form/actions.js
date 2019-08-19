import { createAction } from 'redux-act';

export const setFormItems = createAction('BG_SET_FORM_ITEMS');
export const updateFormState = createAction('BG_UPDATE_STATE_FORM_ITEMS');

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
      dispatch(setFormItems(myJson.map(entry => ({
        ...entry,
        invalid:
        false,
        checkmark: (entry.options && entry.options.some(item => item.selected))
      }))));
    });
};

export const sendFormState = () => (dispatch, getState) => {
  const {
    config: { config: { apiUrl } },
    authentication: { at },
    form: { formState },
  } = getState();

  fetch(`${apiUrl}/api/contract/form`, {
    method: 'POST',
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
    body: JSON.stringify(formState),
  })
    .then(response => {
      return response.json();
    })
    .then(myJson => {
      console.log('TODO', myJson)
    });
};

export const postNewform = () => (dispatch, getState) => {
  const {
    config: { config: { apiUrl } },
    authentication: { at },
  } = getState();

  fetch(`${apiUrl}/api/contract/form`, {
    method: 'POST',
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
    .then(() => {
      console.log('form posted')
    });
};
