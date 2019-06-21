import { createReducer } from 'redux-act';
import {
  setSearchValue,
  setTableItems,
  setOriginalTableItems,
} from './actions';

export const ongoing = createReducer(
  {
    [setSearchValue]: (state, { lastSearch, isSearching = true }) => ({
      ...state,
      lastSearch,
      isSearching,
    }),
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
    lastSearch: '',
    pageNumber: 0,
    needsPagination: false,
    isSearching: false,
    tableOriginalItems: {},
    tableItems: {},
  }
);
