import { createReducer } from 'redux-act';

import {
  setFormItems,
} from './actions';

export const form = createReducer(
  {
    [setFormItems]: (state, formItems = []) => ({
      ...state,
      formItems: [...formItems],
    }),
  },
  {
    formItems: [],
  }
);
