import { combineReducers } from 'redux';

import { authentication } from './pages/login/reducers';
import { menu } from './organisms/menu/reducers';
import { ongoing } from './pages/ongoing/reducers';

const rootReducer = combineReducers({
  authentication,
  menu,
  ongoing,
});

export default rootReducer;
