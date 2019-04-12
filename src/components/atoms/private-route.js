import React from 'react';

import { Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )}
  />
);

PrivateRoute.propTypes = {
  component: (props, propName) => {
    if (!props[propName] || typeof (props[propName].render) !== 'function') {
      return new Error(`${propName}.render must be a function!`);
    }
    return true;
  },
};

PrivateRoute.defaultProps = {
  component: null,
};

export default PrivateRoute;
