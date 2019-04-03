import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import 'document-register-element';

import '@axa-ch/patterns-library/lib/components/u-core/index';
import '@axa-ch/patterns-library/lib/components/a-icon/index';
import { AXAButton } from '@axa-ch/patterns-library/lib/js/react-exports';

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
      <axa-core only-load="true" icons-path="icons.svg" />
      <AXAButton arrow motion>My Button medium</AXAButton>
    </Fragment>, this.elem);
  }
}
