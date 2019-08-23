import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import * as allActions from './actions';

class Home extends PureComponent {
  componentDidMount() {
    const { details, loadHomeDetail, contractNummer } = this.props;

    if (!details) {
      loadHomeDetail(contractNummer);
    }
  }

  componentWillReceiveProps({ contractNummer: newContractNumber }) {
    const { contractNummer, loadHomeDetail } = this.props;
    if (contractNummer !== newContractNumber) {
      loadHomeDetail(newContractNumber);
    }
  }

  render() {
    const { details, t } = this.props;

    if (!details) {
      return (
        <section className="o-baug__app__police-detail">
          <div className="lds-dual-ring" />
        </section>
      );
    }
    const { contractor, detail_overview: detailOverview } = details;
    return (
      <div className="o-baug__app__home-section-wrapper">
        <section className="o-baug__app__home-section">
          <h2 className="o-baug__app__home-section-title">
            {t('bg.home.contractor_title')}
          </h2>
          <div>
            <strong className="o-baug__app__home-section-label">
              {t('bg.home.contractor.name')}:
            </strong>
            <span>{contractor.name}</span>
            <br />
            <strong className="o-baug__app__home-section-label">
              {t('bg.home.contractor.adress_line1')}:
            </strong>
            <span>{contractor.adress_line1}</span>
            <br />
            <strong className="o-baug__app__home-section-label">
              {t('bg.home.contractor.adress_line2')}:
            </strong>
            <span>{contractor.adress_line2}</span>
            <br />
            <strong className="o-baug__app__home-section-label">
              {t('bg.home.contractor.adress_line3')}:
            </strong>
            <span>{contractor.adress_line3}</span>
          </div>
        </section>
        <section className="o-baug__app__home-section">
          <h2 className="o-baug__app__home-section-title">
            {t('bg.home.detail_overview_title')}
          </h2>
          <div>
            <strong className="o-baug__app__home-section-label">
              {t('bg.home.detail_overview.police_nummer')}:
            </strong>
            <span>{detailOverview.police_nummer}</span>
            <br />
            <strong className="o-baug__app__home-section-label">
              {t('bg.home.detail_overview.deposit_amount')}:
            </strong>
            <span>{detailOverview.deposit_amount}</span>
            <br />
            <strong className="o-baug__app__home-section-label">
              {t('bg.home.detail_overview.left_amount')}:
            </strong>
            <span>{detailOverview.left_amount}</span>
            <br />
            <strong className="o-baug__app__home-section-label">
              {t('bg.home.detail_overview.max_paying_out')}:
            </strong>
            <span>{detailOverview.max_paying_out}</span>
          </div>
        </section>
      </div>
    );
  }
}

Home.propTypes = {
  details: PropTypes.object,
  contractNummer: PropTypes.string.isRequired,
  loadHomeDetail: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

Home.defaultProps = {
  details: null,
};

export default connect(
  state => state.home,
  allActions
)(withRouter(withTranslation()(Home)));
