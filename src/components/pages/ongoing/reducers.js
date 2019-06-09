import { createReducer } from 'redux-act';
import {
  setSearch,
  setTableItems,
} from './actions';

export const ongoing = createReducer(
  {
    [setSearch]: (state, lastSearch = '') => ({
      ...state,
      lastSearch,
    }),
    [setTableItems]: (state, tableItems = []) => ({
      ...state,
      tableItems: {...tableItems},
    }),
  },
  {
    lastSearch: '',
    tableItems: {},
  }
);
