import { ADD_ARTICLE } from '../actions';

export const test = (state = 0, action) => {
  switch (action.type) {
    case ADD_ARTICLE:
      return state + 1;
    default:
      return state;
  }
};
