import '@axa-ch/patterns-library-polyfill';

import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import ReactDOM from 'react-dom';

import './index.scss';
import store from './store';

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
    ReactDOM.render(<Fragment>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </Fragment>, this.elem);
  }
}
