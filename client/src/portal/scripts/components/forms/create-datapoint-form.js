import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { push } from 'react-router-redux';

import { createDatapoint } from './../../actions/datapoint';
import { updateDataset } from './../../actions/dataset';
import * as types from './../../actions/_types';

import {
  Input
} from './../../../../react-ui-kit/components/redux-form-fields';


/**
 * @param values
 * @param dispatch
 * @returns {Promise} - !important - this function *must* return Promise, until
 * resolve is called, its' submitting prop will be true
 */
const submit = (values, dispatch, props) => {
  // dispatch(startLoading());

  return new Promise((resolve, reject) => {
    dispatch(createDatapoint(values)).then(
      (data) => {
        if (data.type === types.CREATE_DATAPOINT_FAIL) {  // todo // if (data.status === 202) {}
          reject(data.payload);
        }

        // todo - extract
        let newDatasetState = {...props.dataset};
        newDatasetState.datapoints.push(data.payload.id);
        dispatch(updateDataset(newDatasetState));

        // dispatch(stopLoading());
        resolve(data);
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


let CreateDatapointForm = props => {

  const { error, handleSubmit, pristine, submitting, valid } = props;

  return (
    <form onSubmit={handleSubmit(submit.bind(this))}>
      <Field name="label" type="text" component={Input} label="Label" />
      <Field name="value" type="text" component={Input} label="Value" />
      <div>
        <button type="submit" disabled={pristine || submitting || !valid}>Create</button>
      </div>
      {error && <strong style={{color:'red'}}>{error}</strong>}
    </form>
  )
};

const validate = (values, props) => {   // todo - validate
  const errors = {};
  return errors;
};

// decorate
CreateDatapointForm = reduxForm({
  form: 'createDatapointForm',
  validate
})(CreateDatapointForm);

// CreateDatapointForm = connect(
//   (state, ownProps) => ({}),
//   (dispatch, ownProps) => ({}))
// )(CreateDatapointForm);

export default CreateDatapointForm
