export const LOGIN = 'LOGIN';

export const setAccessToken = payload => ({
  type: LOGIN,
  payload,
});
