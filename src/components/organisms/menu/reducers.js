import { createReducer } from 'redux-act';
import {
  setMenuItems,
} from './actions';

export const menu = createReducer(
  {
    [setMenuItems]: (state, menuItems = []) => ({
      ...state,
      menuItems: [...menuItems],
    }),
  },
  {
    username: '',
    password: '',
    valid: true,
    menuItems: [],
  }
);
