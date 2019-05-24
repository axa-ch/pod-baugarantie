import React from 'react';
import PropTypes from 'prop-types';

import { AXAButton } from '../patterns-library';

// import all your needed wrapped custom elements

const Login = ({ addArticle }) => (
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
        onClick={() => { addArticle(); }}
        type="reset"
      >Reset
      </AXAButton>
      <AXAButton
        onClick={() => { addArticle(); }}
        type="submit"
      >Login
      </AXAButton>
    </form>
  </article>
);

Login.propTypes = {
  addArticle: PropTypes.func.isRequired,
};

export default Login;
