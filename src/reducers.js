import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';

import { authentication } from './components/pages/login/reducers';
import { menu } from './components/organisms/menu/reducers';
import { form } from './components/organisms/form/reducers';
import { ongoing } from './components/pages/ongoing/reducers';
import { home } from './components/pages/home/reducers';
import { contracts } from './components/atoms/contracts/reducers';
import { policeDetail } from './components/molecules/police-detail/reducers';

import {
  setConfig,
} from './actions';

const config = createReducer(
  {
    [setConfig]: (state, _config = {}) => ({
      ...state,
      config: {..._config}
    }),
  },
  {
    config: {},
  }
);


const rootReducer = combineReducers({
  authentication,
  config,
  menu,
  form,
  home,
  ongoing,
  contracts,
  policeDetail,
});

export default rootReducer;
