import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

import { AXAContainer } from './patterns-library';

import PrivateRoute from './atoms/private-route';
import Menu from './organisms/menu';

import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Login from './pages/login/index';

const App = ({ history, at }) => {
  const { location: { pathname } } = history;
  if (~pathname.indexOf('login') && at.length > 1) {
    history.push('/dashboard');
  }
  return (
    <AXAContainer>
      <Menu />
      <article className="o-baug__app__content">
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
      </article>
    </AXAContainer>
  )
};

App.propTypes = {
  history: PropTypes.object,
  at: PropTypes.string,
};

App.defaultProps = {
  at: '',
  history: null,
};

export default connect(
  state => state.authentication
)(withRouter(App));
