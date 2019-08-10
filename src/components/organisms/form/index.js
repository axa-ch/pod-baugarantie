import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import * as allActions from './actions';

import { NEW, EDIT, VIEW, GET_FORM_COMPONENT } from './config';

class Form extends PureComponent {

  componentDidMount(){
    const { formItems, loadFormData } = this.props;

    if (!formItems.length) {
      loadFormData();
    }
  }

  _getInputElement = (config, index) => {
    const { mode, t } = this.props;
    const { type } = config;

    const Comp = GET_FORM_COMPONENT[type];

    if (!Comp) {
      throw new Error(`Component Type: ${type} is not recognised! Please add it to the frontend`)
    }

    switch (type) {
      case 'axa-dropdown':
        const { options } = config;
        const translatedOptions = options.map(option => {
          return {
            ...option,
            name: t(option.name)
          }
        });
        return (
          <Comp
            key={`form_index${index}`}
            label={t(config.label)}
            className=''
            required={config.required}
            name={config.name}
            items={translatedOptions}
            disabled={mode === VIEW}
          />
        );
      case 'axa-datepicker':
        return (
          <Comp
            inputfield
            key={`form_index${index}`}
            label={t(config.label)}
            className=''
            required={config.required}
            name={config.name}
            disabled={mode === VIEW}
          />
        );
      default:
        const lines = config.lines || 1;
        const inputs = [];

        for (let i = 0; i < lines; i++) {
          inputs.push((
            <Comp
              key={`form_index${index}`}
              className=''
              label={i === 0 ? t(config.label) : ''}
              required={config.required}
              name={i === 0 ? config.name : `${config.name}_${i}`}
              disabled={mode === VIEW}
            />
          ))
        }

        return inputs;
    }
  }

  render() {
    const { mode, contractNummer, formItems } = this.props;
    if (mode !== NEW && mode !== EDIT && mode !== VIEW) {
      throw new Error(`
        Mode not recognised.
        Recieved: ${mode}. Allowed modes: ${VIEW}, ${EDIT}, ${NEW}`);
    }
    return (
      <form className="o-baug__app__contract-form">
        Mode: {mode} for contract nr {contractNummer}
        {formItems && formItems.map((...args) => (
          <div className="o-baug__app__contract-form-inputs">
            {this._getInputElement(...args)}
          </div>
        )) }
      </form>
    );
  }
}

Form.propTypes = {
  mode: PropTypes.string,
  formItems: PropTypes.array.isRequired,
  loadFormData: PropTypes.func.isRequired,
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
