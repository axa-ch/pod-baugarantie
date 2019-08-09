import { createAction } from 'redux-act';

export const setMenuItems = createAction('BG_SET_MENU_ITEMS');

export const loadItemMenus = () => (dispatch, getState) => {
  const {
    config: { config: { apiUrl } },
  } = getState();

  fetch(`${apiUrl}/api/menu`, {
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
      dispatch(setMenuItems(myJson));
    });
};
