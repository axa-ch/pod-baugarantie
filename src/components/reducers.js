import { combineReducers } from 'redux';

import { authentication } from './pages/login/reducers';

const rootReducer = combineReducers({
  authentication,
});

export default rootReducer;
