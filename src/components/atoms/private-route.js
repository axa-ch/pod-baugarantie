import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Contracts from './contracts';
import LocaleRoute from './locale-route';

const PrivateRoute = ({ component: Component, at, ...rest }) => {
  if(at) {
    return (
      <LocaleRoute
        {...rest}
        render={props => <Contracts component={Component} {...props} />}
      />
    );
  }

  return (
    <Redirect
      to={{ pathname: '/login', state: { from: rest.location } }}
    />
  );
};

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
