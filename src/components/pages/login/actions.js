import { createAction } from 'redux-act';

export const setUsername = createAction('BG_LOGIN_SET_USERNAME');
export const setPassword = createAction('BG_LOGIN_SET_PASSWORD');
export const setValidLogin = createAction('BG_LOGIN_SET_VALID');
export const setAccessToken = createAction('BG_LOGIN_SET_ACCESS_TOKEN');

export const submitLogin = () => (dispatch, getState) => {
  const {
    authentication: { username, password },
  } = getState();
  if (username && password) {
    fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify({ username, password }),
    })
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        const { access_token: accessToken } = myJson;
        sessionStorage.setItem('bg_at', accessToken);
        dispatch(setAccessToken(accessToken));
      });
  } else {
    dispatch(setValidLogin(false));
  }
};
