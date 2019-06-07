import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import * as allActions from './actions';


class Menu extends PureComponent {

  componentDidMount(){
    const { menuItems, loadItemMenus } = this.props;

    if (!menuItems.length) {
      loadItemMenus();
    }
  }

  render() {
    const { at, menuItems, history } = this.props;
    return (
      <nav className="o-baug__app__nav">
        {at && menuItems.length ? (
          <>
            {menuItems.map(({ name, url }, index) => (
              <button
                key={`key-button-${index}`}
                className="o-baug__app__nav-button"
                onClick={() => history.push(url)}
              >
                {name}
              </button>
            ))}
          </>
        ) : (
          <div className="lds-dual-ring" />

        )}
      </nav>
    );
  }
}

Menu.propTypes = {
  at: PropTypes.string,
  menuItems: PropTypes.array,
  history: PropTypes.object.isRequired,
  loadItemMenus: PropTypes.func.isRequired,
};

Menu.defaultProps = {
  at: '',
  menuItems: [],
};

export default connect(
  state => ({
    ...state.authentication,
    ...state.menu,
  }),
  allActions
)(withRouter(Menu));
