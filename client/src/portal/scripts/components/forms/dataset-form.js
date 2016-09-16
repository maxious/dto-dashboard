import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { isURL } from 'validator';

import { updateDataset } from './../../actions/dataset';
import * as types from './../../actions/_types';

import {
  Input,
  Textarea,
  Select
} from './../../../../react-ui-kit/components/redux-form-fields';


/**
 * Update Dataset Form
 * @constructor
 */
let DatasetForm = props => {

  const { error, handleSubmit, pristine, submitting, valid } = props;

  return (
    <form onSubmit={handleSubmit(submit.bind(this))}>
      <Field name="name" type="text" component={Input} label="Name"/>
      <Field name="units" options={[
        { value: 'n', label: 'Percentage' },
        { value: '$', label: 'Currency' },
        { value: 'n', label: 'Number' },
        { value: 'f', label: 'Float' },
        { value: 's', label: 'Seconds' }
      ]} component={Select} label="Units"/>
      <Field name="notes" component={Textarea} label="Notes"/>
      <div>
        <button type="submit" disabled={pristine || submitting || !valid}>Save</button>
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
  // dispatch(startLoading());

  return new Promise((resolve, reject) => {
    dispatch(updateDataset(values)).then(
      (data) => {
        if (data.type === types.UPDATE_DATASET_FAIL) {  // todo // if (data.status === 202) {}
          reject(data);
        }
        // dispatch(stopLoading());
        resolve();
      },
      (error) => {
        reject(error);
      }
    );
  }).catch((data) => {
    // dispatch(stopLoading());

    // todo - check error and fail accordingly
    throw new SubmissionError({ name: 'Name does not exist', _error: 'Submit failed!' });
  });
};


const validate = (values, props) => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Required';
  }

  if (!values.notes) {
    errors.notes = 'Required';
  }

  if (!values.url) {
    errors.url = 'Required';
  } else if (isURL(values.url) === false) {
    errors.url = 'Must be a valid URL';
  }

  return errors;
};


// decorate
DatasetForm = reduxForm({
  form: 'datasetForm',
  validate
})(DatasetForm);

// DatasetForm = connect(
//   (state, ownProps) => ({}),
//   (dispatch) => ({})
// (DatasetForm);

export default DatasetForm
