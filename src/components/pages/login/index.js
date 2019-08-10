import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { AXAButton, AXAInputTextReact } from '../../patterns-library';

import * as allActions from './actions';

export const Login = ({
  setUsername,
  setPassword,
  submitLogin,
  valid,
  username,
  t,
  password,
}) => (
  <section className="o-baug__app__login-form">
    <form
      onSubmit={e => {
        e.preventDefault();
        submitLogin();
      }}
    >
      <div className="o-baug__app__login-form-inputs">
        <AXAInputTextReact
          label={t('bg.login.username')}
          required
          checkMark={username && valid}
          type="text"
          invalid={!valid}
          onChange={({ target: { value } }) => setUsername(value)}
          name="username"
        />
        <AXAInputTextReact
          label={t('bg.login.password')}
          required
          checkMark={password && valid}
          invalid={!valid}
          type="password"
          onChange={({ target: { value } }) => setPassword(value)}
          name="password"
        />
      </div>
      <AXAButton variant="secondary" type="reset">
        {t('bg.login.change_password')}
      </AXAButton>
      <AXAButton type="submit">{t('bg.login.login')}</AXAButton>
    </form>
  </section>
);

Login.propTypes = {
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  submitLogin: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default connect(
  state => state.authentication,
  allActions
)(withTranslation()(Login));
