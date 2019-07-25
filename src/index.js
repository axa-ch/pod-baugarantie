import '@axa-ch/patterns-library-polyfill';
import 'core-js/modules/es6.symbol';
import 'core-js/modules/es6.array.find';
import 'core-js/modules/es6.string.starts-with';
import 'core-js/modules/es6.string.includes'
import 'whatwg-fetch';

import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import ReactDOM from 'react-dom';

import { initTranslations } from './i18n';

import './index.scss';
import store from './store';

import { setAccessToken } from './components/pages/login/actions';

import App from './components/app';

export default class PodBaugarantie {
  // elem is the DOM node where the pod will be atatched on
  // options are the data attributes of the pod
  constructor(elem, options) {
    this.elem = elem;
    this.options = options;
    this.init();
  }

  init() {
    const bgAt = sessionStorage.getItem('bg_at');
    const { dispatch } = store;

    if (bgAt) {
      dispatch(setAccessToken(bgAt));
    }

    initTranslations(this.options.language)

    ReactDOM.render(<Fragment>
      <Provider store={store}>
        <div className="o-baug__app">
          <HashRouter>
            <App />
          </HashRouter>
        </div>
      </Provider>
    </Fragment>, this.elem);
  }
}
