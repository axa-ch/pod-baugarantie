import { createReducer } from 'redux-act';
import {
  setContracts,
} from './actions';

export const contracts = createReducer(
  {
    [setContracts]: (state, _contracts) => ({
      ...state,
      contracts: _contracts,
    }),
  },
  {
    contracts: [],
  }
);
