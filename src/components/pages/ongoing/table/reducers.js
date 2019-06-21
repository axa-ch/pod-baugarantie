import { createReducer } from 'redux-act';
import {
  setTableItems,
  setOriginalTableItems,
} from './actions';

export const ongoing = createReducer(
  {
    [setTableItems]: (state, { needsPagination, isSearching = false, ...rest }) => ({
      ...state,
      tableItems: { ...rest },
      needsPagination,
      isSearching,
    }),
    [setOriginalTableItems]: (state, { needsPagination, tableOriginalItems, ...rest }) => ({
      ...state,
      tableItems: rest,
      needsPagination,
      tableOriginalItems,
    }),
  },
  {
    pageNumber: 0,
    needsPagination: false,
    tableOriginalItems: {},
    tableItems: {},
  }
);
