import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'document-register-element';

import '@axa-ch/patterns-library/lib/components/u-core/index';
import '@axa-ch/patterns-library/lib/components/a-icon/index';

import App from './components/app';
import store from './store';
import './index.scss';

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
        <App />
      </Provider>
    </Fragment>, this.elem);
  }
}
