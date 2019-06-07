import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { AXAButton, AXAInputTextReact } from '../../patterns-library';

import * as allActions from './actions';

const Login = ({ setUsername, setPassword, submitLogin, valid }) => (
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
          type="text"
          onChange={({ target: { value } }) => setUsername(value)}
          name="username"
        />
        <AXAInputTextReact
          label="Password"
          required
          type="password"
          onChange={({ target: { value } }) => setPassword(value)}
          name="password"
        />
      </div>
      {valid ? (
        ''
      ) : (
        <div className="o-baug__app__form-inputs__valid-field">
          Input parameter sind invalid
        </div>
      )}
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
};

export default connect(
  state => state.authentication,
  allActions
)(Login);
