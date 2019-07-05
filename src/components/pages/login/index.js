import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { AXAButton, AXAInputTextReact } from '../../patterns-library';

import * as allActions from './actions';

const Login = ({ setUsername, setPassword, submitLogin, valid, username, password }) => (
  <article className="o-baug__app__form">
    <form
      onSubmit={e => {
        e.preventDefault();
        submitLogin();
      }}
    >
      <div className="o-baug__app__form-inputs">
        <AXAInputTextReact
          label="Username"
          required
          checkMark={username && valid}
          type="text"
          onChange={({ target: { value } }) => setUsername(value)}
          name="username"
        />
        <AXAInputTextReact
          label="Password"
          required
          checkMark={password && valid}
          error={valid ? '' : 'Input parameter sind invalid'}
          type="password"
          onChange={({ target: { value } }) => setPassword(value)}
          name="password"
        />
      </div>
      <AXAButton variant="secondary" type="reset">
        Password ändern
      </AXAButton>
      <AXAButton type="submit">Login</AXAButton>
    </form>
  </article>
);

Login.propTypes = {
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  submitLogin: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default connect(
  state => state.authentication,
  allActions
)(Login);
