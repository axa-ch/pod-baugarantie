import { createReducer } from 'redux-act';
import {
  setUsername,
  setPassword,
  setValidLogin,
  setAccessToken,
} from './actions';

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
    [setAccessToken]: (state, at = '') => ({
      ...state,
      at,
    }),
  },
  {
    username: '',
    password: '',
    valid: true,
    at: '',
  }
);
