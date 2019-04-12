import { LOGIN } from '../actions';

export const authentication = (state = { at: '' }, { type, payload }) => {
  switch (type) {
    case LOGIN:
      state.at = payload;
      break;
    default:
      return state;
  }
  return state;
};
