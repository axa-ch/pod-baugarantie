import { AXAButton } from '@axa-ch/patterns-library/lib/js/react-exports';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as allActions from '../actions';

const App = ({ addArticle }) => (
  <article>
    am in app ww dd
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
