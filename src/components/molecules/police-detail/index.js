import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import * as allActions from './actions';
import { AXAInputTextReact } from '../../patterns-library';

class PoliceDetail extends PureComponent {
  componentDidMount(){
    const { details, loadPoliceDetail, contractNummer } = this.props;

    if (!details) {
      loadPoliceDetail(contractNummer);
    }
  }

  componentWillReceiveProps({ contractNummer: newContractNumber }){
    const { contractNummer, loadPoliceDetail } = this.props;
    if (contractNummer !== newContractNumber) {
      loadPoliceDetail(newContractNumber);
    }
  }

  render() {
    const { details, t } = this.props;

    if (!details) {
      return (
        <section className="o-baug__app__police-detail">
          <div className="lds-dual-ring" />
        </section>
      )
    }
    return (
      <section className="o-baug__app__police-detail">
        <AXAInputTextReact
          label={t('bg.police_detail.police_nummer')}
          value={details.police_nummer}
          disabled
        />
        <AXAInputTextReact
          label={t('bg.police_detail.deposit_amount')}
          value={details.deposit_amount}
          disabled
        />
        <AXAInputTextReact
          label={t('bg.police_detail.left_capacity')}
          value={details.left_capacity}
          disabled
        />
        <AXAInputTextReact
          label={t('bg.police_detail.amount_prepaid')}
          value={details.amount_prepaid}
          disabled
        />
        <AXAInputTextReact
          label={t('bg.police_detail.total_engagement')}
          value={details.total_engagement}
          disabled
        />
        <AXAInputTextReact
          label={t('bg.police_detail.amount_engagement')}
          value={details.amount_engagement}
          disabled
        />
      </section>
    )
  }
}

PoliceDetail.propTypes = {
  details: PropTypes.object,
  contractNummer: PropTypes.string.isRequired,
  loadPoliceDetail: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

PoliceDetail.defaultProps = {
  details: null,
};

export default connect(
  state => state.policeDetail,
  allActions
)(withRouter(withTranslation()(PoliceDetail)));
