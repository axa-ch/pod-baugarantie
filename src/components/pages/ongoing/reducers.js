import { createReducer } from 'redux-act';
import {
  setSearchValue,
  setTableItems,
  setOriginalTableItems,
} from './actions';

export const ongoing = createReducer(
  {
    [setSearchValue]: (state, { lastSearch, isSearching = true }) => {
      // for performance reason, leave table data out till search debounce is over
      if (isSearching) {
        return {
          lastSearch,
          tableItems: {
            thead: [],
            tbody: [[]],
          },
          pageNumber: state.pageNumber,
          needsPagination: state.needsPagination,
          isSearching: state.isSearching,
        };
      }
      return {
        ...state,
        lastSearch,
        isSearching,
      };
    },
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
