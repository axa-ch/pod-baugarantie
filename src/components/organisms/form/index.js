import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import * as allActions from './actions';

import {
  AXAButton
} from '../../patterns-library';

import { NEW, EDIT, VIEW, GET_FORM_COMPONENT } from './config';

class Form extends PureComponent {
  componentDidMount(){
    const { formItems, loadFormData } = this.props;

    if (!formItems.length) {
      loadFormData();
    }
  }

  onChange = (event, { name }, index) => {
    const { updateFormState } = this.props;
    const target = {
      value: event.target.value, name, inFormIndex: index
    }
    updateFormState(target);
  }

  _getInputElement = (config, index) => {
    const { mode, t } = this.props;
    const { type } = config;

    const Comp = GET_FORM_COMPONENT[type];

    if (!Comp) {
      throw new Error(`Component Type: ${type} is not recognised! Please add it to the frontend`)
    }

    // TODO: dryfiy props on components
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
            checkMark={config.checkmark}
            onChange={(e) => { this.onChange(e, config, index) }}
            required={config.required}
            name={config.name}
            invalid={config.invalid}
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
            invalid={config.invalid}
            checkMark={config.checkmark}
            error={t(config.error)}
            onChange={(e) => { this.onChange(e, config, index) }}
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
              key={`form_index${index}_${i}`}
              className=''
              onChange={(e) => this.onChange(e, {
                ...config,
                name: i === 0 ? config.name : `${config.name}_${i}`
              }, index)}
              label={i === 0 ? t(config.label) : ''}
              invalid={config.invalid}
              checkMark={config.checkmark}
              error={i === lines - 1 ? t(config.error) : ''}
              required={config.required}
              name={i === 0 ? config.name : `${config.name}_${i}`}
              disabled={mode === VIEW}
            />
          ))
        }

        return inputs;
    }
  }

  // TODO
  handleSubmit = (event) => {
    event.preventDefault();
    const { formState, updateFormState, formItems, sendFormState } = this.props;

    let anyInvalid = false;

    formItems.forEach((item, index) => {
      const { name } = item;

      // let selectedValue = '';

      const { options } = item;
      if(options && options.length) {
        //
      }
      if (!formState[name] && !item.value) {
        updateFormState({ value: '', name, inFormIndex: index });
        anyInvalid = true;
      }
    });

    if (!anyInvalid) {
      sendFormState();
    }
  }

  render() {
    const { mode, formItems, t } = this.props;
    if (mode !== NEW && mode !== EDIT && mode !== VIEW) {
      throw new Error(`
        Mode not recognised.
        Recieved: ${mode}. Allowed modes: ${VIEW}, ${EDIT}, ${NEW}`);
    }
    return (
      <form onSubmit={this.handleSubmit} className="o-baug__app__contract-form">
        <div className="o-baug__app__contract-form-wrapper">
          {formItems && formItems.map((item, index) => (
            <div key={`wrapper-form${index}`} className="o-baug__app__contract-form-inputs">
              {this._getInputElement(item, index)}
            </div>
          )) }
        </div>
        <AXAButton type="submit">
          {t('bg.contract_form.submit_btn')}
        </AXAButton>
      </form>
    );
  }
}

Form.propTypes = {
  mode: PropTypes.string,
  formItems: PropTypes.array.isRequired,
  formState: PropTypes.object.isRequired,
  loadFormData: PropTypes.func.isRequired,
  sendFormState: PropTypes.func.isRequired,
  updateFormState: PropTypes.func.isRequired,
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
