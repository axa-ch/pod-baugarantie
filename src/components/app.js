import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

import { AXAContainer } from './patterns-library';

import PrivateRoute from './atoms/private-route';
import Menu from './organisms/menu';

import Home from './pages/home';
import New from './pages/new';
import Login from './pages/login/index';
import Ongoing from './pages/ongoing/index';

const App = ({ history, at }) => {
  const { location: { pathname } } = history;
  if (~pathname.indexOf('login') && at.length > 1) {
    history.push('/');
  }
  return (
    <AXAContainer>
      <Menu />
      <article className="o-baug__app__content">
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/new" component={New} />
          <PrivateRoute exact path="/ongoing" component={Ongoing} />
          <PrivateRoute exact path="/ongoing/:type/:rowIndex/:cellIndex" component={Ongoing} />
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
