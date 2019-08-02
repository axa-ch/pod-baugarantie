import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, withRouter } from 'react-router-dom';

import { AXAContainer } from './patterns-library';

import PrivateRoute from './atoms/private-route';
import LocaleRoute from './atoms/locale-route';
import Menu from './organisms/menu';

import Home from './pages/home/index';
import New from './pages/new';
import Login from './pages/login/index';
import Ongoing from './pages/ongoing/index';

const App = ({ history, at }) => {
  const {
    location: { pathname },
  } = history;
  if (~pathname.indexOf('login') && at.length > 1) {
    history.push('/home');
  }
  return (
    <AXAContainer>
      <Menu />
      <article className="o-baug__app__content">
        <Switch>
          <LocaleRoute exact path="/:lang?/login" component={Login} />
          <PrivateRoute path="/:lang?/new" component={New} />
          <PrivateRoute exact path="/:lang?/ongoing" component={Ongoing} />
          <PrivateRoute
            exact
            path="/:lang?/ongoing/:type/:rowIndex/:cellIndex"
            component={Ongoing}
          />
          <PrivateRoute exact path="/:lang?/" component={Home} />
        </Switch>
      </article>
    </AXAContainer>
  );
};

App.propTypes = {
  history: PropTypes.object,
  at: PropTypes.string,
};

App.defaultProps = {
  at: '',
  history: null,
};

export default connect(state => state.authentication)(withRouter(App));
