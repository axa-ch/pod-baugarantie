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
    const { component: Component, contracts, detail, t, loadContract } = this.props;

    if (!contracts.length) {
      return (
        <section className="o-baug__app__contracts">
          <div className="lds-dual-ring" />
        </section>
      );
    }

    const { active_contract: activeContract, description, active_index : activeIndex } = detail;

    const preparedContracts = contracts.map(({ nummer }, index) => ({
      name: nummer,
      selected: index === activeIndex,
      value: nummer,
    }));

    console.log(activeContract);

    return (
      <>
        <section className="o-baug__app__contracts">
          <h1>{t('bg.contracts.number')}</h1>
          <AXADropdownReact
            onChange={({ target: { value }}) => {
              const index = preparedContracts.findIndex(
                ({ value : contractValue }) => contractValue === value
              );
              loadContract(value, index);
            }}
            title="Please Select"
            items={preparedContracts}
          />
          { description ? (<p>{description}</p>) : ''}
        </section>
        <Component contractNummer={activeContract} />
      </>
    );
  }
}

Contracts.propTypes = {
  contracts: PropTypes.array,
  detail: PropTypes.object,
  component: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  loadContracts: PropTypes.func.isRequired,
  loadContract: PropTypes.func.isRequired,
};

Contracts.defaultProps = {
  contracts: [],
  detail: {
    active_contract: 0
  },
};

export default connect(
  state => state.contracts,
  allActions
)(withRouter(withTranslation()(Contracts)));
