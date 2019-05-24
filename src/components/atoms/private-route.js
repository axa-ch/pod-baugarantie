import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      sessionStorage.getItem('user')
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

PrivateRoute.defaultProps = {
  component: null,
  location: '/',
};

export default PrivateRoute;
