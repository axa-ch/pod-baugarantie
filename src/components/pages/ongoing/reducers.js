import { createReducer } from 'redux-act';
import {
  setSearchValue,
  setTableItems,
  setOriginalTableItems,
} from './actions';

export const ongoing = createReducer(
  {
    [setSearchValue]: (state, lastSearch = '') => ({
      ...state,
      lastSearch,
    }),
    [setTableItems]: (state, tableItems = []) => ({
      ...state,
      tableItems: {...tableItems},
    }),
    [setOriginalTableItems]: (state, { ...tableItems }) => ({
      ...state,
      tableItems,
      tableOriginalItems: tableItems,
    }),
  },
  {
    lastSearch: '',
    tableOriginalItems: {},
    tableItems: {},
  }
);
