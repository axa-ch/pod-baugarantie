import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as allActions from './actions';
import { AXAInputTextReact } from '../../patterns-library';

class PoliceDetail extends PureComponent {
  componentDidMount(){
    const { details, loadPoliceDetail } = this.props;

    if (!details) {
      loadPoliceDetail();
    }
  }

  render() {
    const { details } = this.props;

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
          label="Policenummer"
          value={details.police_nummer}
          disabled
        />
        <AXAInputTextReact
          label="Deposaldo"
          value={details.deposit_amount}
          disabled
        />
        <AXAInputTextReact
          label="Freie Kapazität"
          value={details.left_capacity}
          disabled
        />
        <AXAInputTextReact
          label="Davon max. für Auszahlungs Garantien"
          value={details.amount_prepaid}
          disabled
        />
        <AXAInputTextReact
          label="Gesamtengagement"
          value={details.total_engagement}
          disabled
        />
        <AXAInputTextReact
          label="Engagement für Auszahlungen"
          value={details.amount_engagement}
          disabled
        />
      </section>
    )
  }
}

PoliceDetail.propTypes = {
  details: PropTypes.object,
  loadPoliceDetail: PropTypes.func.isRequired,
};

PoliceDetail.defaultProps = {
  details: null,
};

export default connect(
  state => state.policeDetail,
  allActions
)(withRouter(PoliceDetail));
