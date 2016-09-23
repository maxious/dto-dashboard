import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { isURL } from 'validator';

import * as types from './../../actions/_types';
import { updateDataset } from './../../actions/dataset';
import {
  Input,
  Textarea,
  Select
} from './../../../../_react-ui-kit/components/redux-form-fields';


/**
 * Update Dataset Form
 * @constructor
 */
let UpdateDatasetForm = props => {

  const {
    error, handleSubmit, pristine, submitting, valid,
    isEditing,
    SELECT_DATASET_LABEL
  } = props;

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Field component={Input} name="name" type="text" label="Name"
             fieldProps={{disabled:!isEditing}}
             optionProps={{}} />

      <Field component={Input} name="label" type="text" label="Label"
             fieldProps={{disabled:!isEditing}}
             optionProps={{}} />

      <Field component={Select} name="units" label="Units"
             fieldProps={{disabled:!isEditing}}
             optionProps={{options:SELECT_DATASET_LABEL}} />

      <Field component={Textarea} name="notes" label="Notes"
             fieldProps={{disabled:!isEditing}}
             optionProps={{isOptional:true}} />

      <div>
        <button type="submit"
                className='btn primary'
                disabled={pristine || submitting || !valid}
                onClick={handleSubmit(submit.bind(this))}>Save</button>
        <button type="cancel"
                className='btn primary-link'
                disabled={!isEditing || submitting}
                onClick={cancel.bind({}, props)}>Cancel</button>
      </div>
      {error && <strong style={{color:'red'}}>{error}</strong>}
    </form>
  )
};


/**
 * @param values
 * @param dispatch
 * @returns {Promise} - !important - this function *must* return Promise, until
 * resolve is called, its' submitting prop will be true
 */
const submit = (values, dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(updateDataset(values)).then(
      (d) => {
        if (d.type === types.UPDATE_DATASETS_FAIL) {  // todo // if (d.status === 202) {}
          reject(d);
        }
        resolve(d.payload);
      },
      (error) => {
        reject(error);
      },
    ).catch((error) => {
      // todo - check error and fail accordingly
      console.error(error);
      throw new SubmissionError({name: 'Name does not exist', _error: 'Submit failed!'});
    });
  });
};

const validate = (values, props) => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Required';
  }

  if (!values.label) {
    errors.label = 'Required';
  }

  if (!values.units) {
    errors.units = 'Required';
  }

  return errors;
};

const cancel = (props) => {
  props.reset(props.form);
  props.onCancelSuccess();
};


UpdateDatasetForm = reduxForm({
  form: 'updateDatasetForm',
  validate,
  destroyOnUnmount: true
})(UpdateDatasetForm);

UpdateDatasetForm = connect(
  (state, ownProps) => ({
    enableReinitialize: true
  }),
  (dispatch, ownProps) => ({
    initialValues: ownProps.formModel
  })
)(UpdateDatasetForm);

export default UpdateDatasetForm
