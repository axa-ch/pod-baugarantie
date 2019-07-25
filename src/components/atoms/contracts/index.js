import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import * as allActions from './actions';
import { AXADropdownReact } from '../../patterns-library';

class Contracts extends PureComponent {
  componentDidMount() {
    const { contracts, loadContracts } = this.props;

    if (!contracts.length) {
      loadContracts();
    }
  }

  render() {
    const { component: Component, contracts, t } = this.props;

    if (!contracts.length) {
      return (
        <section className="o-baug__app__contracts">
          <div className="lds-dual-ring" />
        </section>
      );
    }

    const preparedContracts = contracts.map(({ nummer }, index) => ({
      name: nummer,
      selected: index === 0,
      value: nummer,
    }));

    return (
      <>
        <section className="o-baug__app__contracts">
          <h1>{t('bg.contracts.number')}</h1>
          <AXADropdownReact title="Please Select" items={preparedContracts} />
        </section>
        <Component />
      </>
    );
  }
}

Contracts.propTypes = {
  contracts: PropTypes.array,
  component: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  loadContracts: PropTypes.func.isRequired,
};

Contracts.defaultProps = {
  contracts: [],
};

export default connect(
  state => state.contracts,
  allActions
)(withRouter(withTranslation()(Contracts)));
