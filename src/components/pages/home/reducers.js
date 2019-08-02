import { createReducer } from 'redux-act';
import { setHomeDetails } from './actions';

export const home = createReducer(
  {
    [setHomeDetails]: (state, details) => ({
      ...state,
      details,
    }),
  },
  {
    details: null,
  }
);
