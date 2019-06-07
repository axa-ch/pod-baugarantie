import { combineReducers } from 'redux';

import { authentication } from './pages/login/reducers';
import { menu } from './organisms/menu/reducers';

const rootReducer = combineReducers({
  authentication,
  menu,
});

export default rootReducer;
