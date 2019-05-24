import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, Link } from 'react-router-dom';

import { AXAButton, AXAContainer } from './patterns-library';

import PrivateRoute from './atoms/private-route';

import * as allActions from '../actions';

import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Login from './pages/login';

const App = ({ addArticle }) => (
  <AXAContainer>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
    </Switch>
    <nav>
      <Link href="/" to="/">Home</Link>
      <Link href="/dashboard" to="/dashboard">Dashboard</Link>
    </nav>
    <AXAButton
      onClick={() => { addArticle(); }}
      icon="arrow-right"
    >
      My Button medium
    </AXAButton>
  </AXAContainer>
);

App.propTypes = {
  addArticle: PropTypes.func.isRequired,
};

export default connect(
  state => state,
  allActions,
)(App);
