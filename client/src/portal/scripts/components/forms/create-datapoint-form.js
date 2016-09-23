import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { push } from 'react-router-redux';

import { createDatapoint } from './../../actions/datapoint';
import { updateDataset } from './../../actions/dataset';
import * as types from './../../actions/_types';
import { isNumeric } from 'validator';
import {
  Input,
  MonthYearDate
} from './../../../../_react-ui-kit/components/redux-form-fields';


/**
 * Create Datapoint Form
 * @param props
 * @constructor
 */
let CreateDatapointForm = props => {

  const {
    error, handleSubmit, pristine, submitting, valid,
    exclusionDates
  } = props;

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Field component={MonthYearDate} name="timestamp" type="text" label="Label"
             fieldProps={{}}
             optionProps={{exclusionDates:exclusionDates}} />

      <Field component={Input} name="value" type="text" label="Value"
             fieldProps={{autoFocus:true}}
             optionProps={{}} />

      <div>
        <button type="submit"
                className='btn primary'
                disabled={pristine || submitting || !valid}
                onClick={handleSubmit(submit.bind(this))}>Create</button>

        <button type="cancel"
                className='btn primary-link'
                disabled={submitting}
                onClick={cancel.bind({}, props)}>Cancel</button>
      </div>
      {error && <strong style={{color:'red'}}>{error}</strong>}
    </form>
  )
};


/**
 * @param values
 * @param dispatch
 * @returns {Promise} - this function *must* return Promise, until
 * resolve is called, its' submitting prop will be true
 */
const submit = (values, dispatch, props) => {
  return new Promise((resolve, reject) => {
    dispatch(createDatapoint(values)).then(
      (d) => {
        if (d.type === types.CREATE_DATAPOINT_FAIL) {  // todo // if (d.status === 202) {}
          reject(d.payload);
        }

        // todo - extract
        let newDatasetState = {...props.dataset};
        newDatasetState.datapoints.push(d.payload.id);
        dispatch(updateDataset(newDatasetState));

        resolve(d);
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


const validate = (values, props) => {   // todo - validate
  const errors = {};
  return errors;
};

const cancel = (props) => {
  props.reset();
  props.onCancelSuccess();
};


CreateDatapointForm = reduxForm({
  form: 'createDatapointForm',
  validate,
  destroyOnUnmount: true
})(CreateDatapointForm);


export default CreateDatapointForm
