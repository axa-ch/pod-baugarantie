import { createReducer } from 'redux-act';
import {
  setContracts,
  setContractDetail,
} from './actions';

export const contracts = createReducer(
  {
    [setContracts]: (state, _contracts) => ({
      ...state,
      contracts: _contracts,
    }),
    [setContractDetail]: (state, _detail) => ({
      ...state,
      detail: _detail,
    }),
  },
  {
    contracts: [],
    detail: {
      active_contract: 0
    }
  }
);
