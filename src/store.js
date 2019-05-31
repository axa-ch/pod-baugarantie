import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './components/reducers';

// create the store with the needed middlewears
export default createStore(
  rootReducer,
  process.env.NODE_ENV !== 'production' ?
    // we are in development
    composeWithDevTools(
      applyMiddleware(thunk),
      applyMiddleware(createLogger({
        duration: true,
        diff: true,
        collapsed: true,
      })),
    // we are in production
    ) : applyMiddleware(thunk),
);
