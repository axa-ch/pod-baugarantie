import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Contracts from './contracts';

const PrivateRoute = ({ component: Component, at, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      at ? (
        <Contracts component={Component} {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      )
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func,
  at: PropTypes.string.isRequired,
  location: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

PrivateRoute.defaultProps = {
  component: null,
  location: '/',
};

export default connect(state => ({
  at: state.authentication.at,
}))(PrivateRoute);
