import { combineReducers } from 'redux';

import { authentication } from './pages/login/reducers';
import { menu } from './organisms/menu/reducers';
import { ongoing } from './pages/ongoing/reducers';
import { contracts } from './atoms/contracts/reducers';
import { policeDetail } from './molecules/police-detail/reducers';

const rootReducer = combineReducers({
  authentication,
  menu,
  ongoing,
  contracts,
  policeDetail,
});

export default rootReducer;
