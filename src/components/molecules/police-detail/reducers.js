import { createReducer } from 'redux-act';
import {
  setPoliceDetails,
} from './actions';

export const policeDetail = createReducer(
  {
    [setPoliceDetails]: (state, details) => ({
      ...state,
      details,
    }),
  },
  {
    details: null,
  }
);
