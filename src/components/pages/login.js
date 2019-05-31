import React from 'react';
// import PropTypes from 'prop-types';

import { AXAButton } from '../patterns-library';

const Login = () => (
  <article className="o-baug__app__form">
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        console.log(formData);
      }}
    >
      <div className="o-baug__app__form-inputs">
        <label>
          Username
          <input type="text" name="username" />
        </label>
        <label>
          Password
          <input type="password" name="password" />
        </label>
      </div>
      <AXAButton
        variant="secondary"
        type="reset"
      >Password ändern
      </AXAButton>
      <AXAButton
        type="submit"
      >Login
      </AXAButton>
    </form>
  </article>
);
//
// Login.propTypes = {
//   addUsername: PropTypes.func,
// };
//
// Login.defaultProps = {
//   addUsername: () => {},
// };

export default Login;
