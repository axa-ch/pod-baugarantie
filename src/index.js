import '@axa-ch/patterns-library-polyfill';

import React, { Fragment, createElement } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import ReactDOM from 'react-dom';
import createAXAButtonReact from '@axa-ch/button/lib/index.react';

import './index.scss';
import store from './store';

const AXAButton = createAXAButtonReact(createElement);

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
          gegeg
        </BrowserRouter>
      </Provider>
      <AXAButton icon="arrow">My Button medium</AXAButton>
    </Fragment>, this.elem);
  }
}
