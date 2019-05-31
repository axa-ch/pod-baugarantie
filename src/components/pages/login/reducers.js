import { createReducer } from 'redux-act';
import { setUsername, setPassword, setValidLogin } from './actions';

export const authentication = createReducer(
  {
    [setUsername]: (state, username = '') => ({
      ...state,
      username,
    }),
    [setPassword]: (state, password = '') => ({
      ...state,
      password,
    }),
    [setValidLogin]: (state, valid = true) => ({
      ...state,
      valid,
    }),
  },
  {
    username: '',
    password: '',
    valid: true,
  }
);
