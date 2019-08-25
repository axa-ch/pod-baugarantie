import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// import { HashRouter as Router } from 'react-router-dom';
import { Login } from './index';

import { initTranslations } from '../../../i18n';
//
// import {
//   setUsername as originalSetUsername,
//   setPassword as originalSetPassword,
//   setValidLogin as originalSetValidLogin,
//   setAccessToken as originalSetAccessToken,
//   submitLogin as originalSubmitLogin,
// } from './actions';

Enzyme.configure({ adapter: new Adapter() });

// create the store with the needed middlewears
// We dont use a mocked store cause we want to UNIT test, therefore use the
// shallow method as much as we can.
// If we wrap a useless Provider around, it wont work with shallow anymore
// and then we need to mount the whole component, including sub components which
// will go against the principle of unit testing.
class Setup {
  constructor() {
    this.i18n = initTranslations('en');
  }
  get store() {
    if (!this._store) {
      const history = {
        goBack: jest.fn(),
      };
      const t = key => key;
      this._store = {
        t,
        history,
        match: { path: 'login' },
        valid: true,
        username: '',
        password: '',
      };
    }
    return this._store;
  }

  setUsername = () => {};

  setPassword = () => {};

  submitLogin = () => {};

  deleteLogin = () => {};

  render() {
    return this._render(mount);
  }

  shallow() {
    return this._render(shallow);
  }

  _render(method) {
    return method(
      <Login
        submitLogin={this.submitLogin}
        setUsername={this.setUsername}
        setPassword={this.setPassword}
        deleteLogin={this.deleteLogin}
        {...this.store}
      />
    );
  }
}

describe('Login page', () => {
  let setup = new Setup();
  afterEach(() => {
    setup = new Setup();
  });

  it('should render login form', () => {
    const enzymeWrapper = setup.shallow();
    expect(enzymeWrapper.hasClass('o-baug__app__login-form')).toBe(true);
  });
});
