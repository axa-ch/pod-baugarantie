import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { AXAContainer, AXALink } from './patterns-library';

import PrivateRoute from './atoms/private-route';

import * as allActions from '../actions';

import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Login from './pages/login';

const App = () => (
  <AXAContainer>
    <nav>
      <AXALink href="/">Home</AXALink>
      <AXALink href="/dashboard">Dashboard</AXALink>
    </nav>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
    </Switch>
  </AXAContainer>
);

export default connect(
  state => state,
  allActions,
)(App);
