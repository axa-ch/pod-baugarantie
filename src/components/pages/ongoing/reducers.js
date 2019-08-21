import { createReducer } from 'redux-act';
import {
  setSearchValue,
  setTableItems,
  setTableIsLoading,
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
          rowLength: state.rowLength,
          needsPagination: state.needsPagination,
          isSearching: true,
        };
      }
      return {
        ...state,
        lastSearch,
        isSearching,
      };
    },
    [setTableItems]: (state, { needsPagination, pageNumber, rowLength, isSearching = false, ...rest }) => ({
      ...state,
      tableItems: { ...rest },
      needsPagination,
      pageNumber,
      rowLength,
      isSearching,
    }),
    [setTableIsLoading]: (state, isLoading = false) => ({
      ...state,
      isLoading,
    }),
    [setOriginalTableItems]: (state, { needsPagination, tableOriginalItems, rowLength, ...rest }) => ({
      ...state,
      tableItems: rest,
      needsPagination,
      rowLength,
      tableOriginalItems,
    }),
  },
  {
    lastSearch: '',
    pageNumber: 0,
    rowLength: 0,
    needsPagination: false,
    isSearching: false,
    isLoading: false,
    tableOriginalItems: {},
    tableItems: {},
  }
);
