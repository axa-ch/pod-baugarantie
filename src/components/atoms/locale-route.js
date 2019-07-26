import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import i18n, { LANGUAGES } from '../../i18n';

const LocaleRoute = ({ component: Component, history, ...rest }) => {
  const { render } = rest;
  const { location: { pathname } } = history;

  const firstPathSegment = pathname.split('/')[1];

  if(LANGUAGES.indexOf(firstPathSegment) > -1) {
    i18n.changeLanguage(firstPathSegment);
  }

  return (
    <Route
      {...rest}
      render={render || (props => <Component {...props} />)}
    />
  )
};

LocaleRoute.propTypes = {
  component: PropTypes.func,
  history: PropTypes.object.isRequired,
};

LocaleRoute.defaultProps = {
  component: null,
};

export default withRouter(LocaleRoute);
