import { createReducer } from 'redux-act';

import {
  setFormItems,
  updateFormState,
} from './actions';

export const form = createReducer(
  {
    [setFormItems]: (state, formItems = []) => ({
      ...state,
      formItems: [...formItems],
    }),
    [updateFormState]: (state, target) => {
      const { name, value, inFormIndex } = target;

      const formItems = [...state.formItems];
      const {[inFormIndex]: formItem} = formItems
      const { required } = formItem;

      if (required && !value) {
        formItem.invalid = true;
        formItem.checkmark = false;
        formItem.error = 'bg.contract_form.errors.required';
      } else if (value) {
        formItem.invalid = false;
        formItem.checkmark = true;
      }

      return {
        ...state,
        formItems,
        formState: {
          ...state.formState,
          [name]: value
        }
      }
    },
  },
  {
    formItems: [],
    formState: {},
  }
);
