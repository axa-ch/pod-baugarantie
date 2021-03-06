import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

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
    const { at, menuItems, history, t } = this.props;
    const { length } = menuItems;
    if (!at) {
      return (<></>);
    }
    return (
      <>
        <style>
          .o-baug__app__nav-wrapper{`{
            width: ${length * (15 + 180)}px;
          }`}
        </style>
        <nav className="o-baug__app__nav">
          <div className="o-baug__app__nav-wrapper">
            {length ? (
              <>
                {menuItems.map(({ name, url }, index) => (
                  <button
                    key={`key-button-${index}`}
                    className="o-baug__app__nav-button"
                    onClick={() => history.push(url)}
                  >
                    {t(name)}
                  </button>
                ))}
              </>
            ) : (
              <div className="lds-dual-ring" />
            )}
          </div>
        </nav>
      </>
    );
  }
}

Menu.propTypes = {
  at: PropTypes.string,
  t: PropTypes.func.isRequired,
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
)(withRouter(withTranslation()(Menu)));
