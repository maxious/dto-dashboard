import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form';

import { updateDatapoint } from './../../actions/datapoint';
import * as types from './../../actions/_types';
import { isURL } from 'validator';

import {
  Input
} from './../../../../react-ui-kit/components/redux-form-fields';


/**
 * @param values
 * @param dispatch
 * @returns {Promise} - !important - this function *must* return Promise, until
 * resolve is called, its' submitting prop will be true
 */
const submit = (values, dispatch) => {
  // dispatch(startLoading());

  return new Promise((resolve, reject) => {
    dispatch(updateDatapoint(values)).then(
      (data) => {
        if (data.type === types.UPDATE_DATAPOINT_FAIL) {  // todo // if (data.status === 202) {}
          reject(data);
        }
        // dispatch(stopLoading());
        resolve(data.payload);
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


let UpdateDatapointForm = props => {

  const { error, handleSubmit, pristine, submitting, valid } = props;

  return (
    <form onSubmit={handleSubmit(submit.bind(this))}>

      <Field name="label" type="text" component={Input} label="Label"/>
      <Field name="value" type="text" component={Input} label="Value"/>

      <div>
        <button type="submit" disabled={pristine || submitting || !valid}>Save</button>
      </div>
      {error && <strong style={{color:'red'}}>{error}</strong>}
    </form>
  )
};

const validate = (values, props) => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Required';
  }

  // if (!values.notes) {
  //   errors.notes = 'Required';
  // }
  //
  // if (!values.url) {
  //   errors.url = 'Required';
  // } else if (isURL(values.url) === false) {
  //   errors.url = 'Must be a valid URL';
  // }

  return errors;
};

// decorate
UpdateDatapointForm = reduxForm({
  form: 'updateDatapointForm',
  validate
})(UpdateDatapointForm);

// UpdateDatapointForm = connect(
//   (state, ownProps) => ({}),
//   (dispatch) => ({})
// (UpdateDatapointForm);

export default UpdateDatapointForm
