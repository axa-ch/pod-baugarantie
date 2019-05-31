import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

import { AXAContainer, AXALink } from './patterns-library';

import PrivateRoute from './atoms/private-route';

import * as allActions from '../actions';

import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Login from './pages/login';

const App = ({ history }) => (
  <AXAContainer>
    <nav className="o-baug__app__nav">
      <AXALink onClick={() => history.push('/')} >
        Home
      </AXALink>
      <AXALink onClick={() => history.push('/dashboard')} >
        Dashboard
      </AXALink>
    </nav>
    <article className="o-baug__app__content">
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
    </article>
  </AXAContainer>
);

App.propTypes = {
  history: PropTypes.object,
};

App.defaultProps = {
  history: null,
};

export default connect(
  state => state,
  allActions,
)(withRouter(App));
