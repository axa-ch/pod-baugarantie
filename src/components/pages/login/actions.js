import { createAction } from 'redux-act';

export const setUsername = createAction('BG_LOGIN_SET_USERNAME');
export const setPassword = createAction('BG_LOGIN_SET_PASSWORD');
export const setValidLogin = createAction('BG_LOGIN_SET_VALID');
export const setAccessToken = createAction('BG_LOGIN_SET_ACCESS_TOKEN');

export const submitLogin = () => (dispatch, getState) => {
  const {
    authentication: { username, password },
  } = getState();

  if (!username || !password) {
    dispatch(setValidLogin(false));
  } else {
    dispatch(setValidLogin(true));
  }
  dispatch(setAccessToken('dedeededed'));
};
