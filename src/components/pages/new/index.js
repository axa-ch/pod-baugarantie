import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import Form from '../../../components/organisms/form';

const NewContract = ({ contractNummer }) => (
  <article className="o-baug__app__new">
    <Form contractNummer={contractNummer} />
  </article>
);

NewContract.propTypes = {
  contractNummer: PropTypes.string.isRequired,
};

export default connect(state => state.new)(
  withRouter(withTranslation()(NewContract))
);
