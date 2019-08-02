import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import * as allActions from './actions';
import { AXAInputTextReact } from '../../patterns-library';

import { NEW, EDIT, VIEW, FORM } from './config';

class Form extends PureComponent {
  render() {
    const { mode, contractNummer, t } = this.props;
    if (mode !== NEW && mode !== EDIT && mode !== VIEW) {
      throw new Error(`
        Mode not recognised.
        Recieved: ${mode}. Allowed modes: ${VIEW}, ${EDIT}, ${NEW}`);
    }
    return (
      <form>
        Mode: {mode} for contract nr {contractNummer}
        {FORM &&
          FORM.map((config, index) => (
            <AXAInputTextReact
              key={`form_index${index}`}
              label={t(config.transKey)}
              disabled={mode === VIEW}
            />
          ))}
      </form>
    );
  }
}

Form.propTypes = {
  mode: PropTypes.string,
  t: PropTypes.func.isRequired,
  contractNummer: PropTypes.string.isRequired,
};

Form.defaultProps = {
  mode: NEW,
};

export default connect(
  state => state.form,
  allActions
)(withTranslation()(Form));
