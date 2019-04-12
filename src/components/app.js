import { AXAButton } from '@axa-ch/patterns-library/lib/js/react-exports';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, Link } from 'react-router-dom';

import * as allActions from '../actions';

import Home from './pages/home';

const App = ({ addArticle }) => (
  <article>
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
    <nav>
      <Link to="/">Home</Link>
    </nav>
    <AXAButton arrow motion onClick={() => addArticle()}>My Button medium</AXAButton>
  </article>
);

App.propTypes = {
  addArticle: PropTypes.func.isRequired,
};

export default connect(
  state => state,
  allActions,
)(App);
