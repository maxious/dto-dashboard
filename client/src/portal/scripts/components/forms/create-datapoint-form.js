import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { push } from 'react-router-redux';

import { createDatapoint } from './../../actions/datapoint';
import { updateDataset } from './../../actions/dataset';
import { isNumeric } from 'validator';
import Input from './../fields/input';
import MonthYearDate from './../fields/monthYearDate';
import SubmitButton from './../submitButton';


/**
 * Create Datapoint Form
 * @param props
 * @constructor
 */
let CreateDatapointForm = props => {

  const {
    error, handleSubmit, pristine, submitting, valid,
    exclusionDates, isSubmitting
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
        <SubmitButton type="submit"
                btnText="Create"
                submittingBtnText="Creating.."
                isSubmitting={isSubmitting}
                className='btn primary'
                disabled={pristine || submitting || !valid}
                onClick={handleSubmit(submit.bind(this))} />

        <button type="cancel"
                className='btn primary-link'
                disabled={submitting}
                onClick={cancel.bind({}, props)}>Cancel</button>
      </div>
      <div className="form__help-block">
        {error && <strong>{error}</strong>}
      </div>
    </form>
  )
};


/**
 * @param values
 * @param dispatch
 * @returns {Promise} - this function *must* return Promise, until
 * resolve is called, its' submitting prop will be true
 */
const submit = (values, dispatch, props) => { // todo
  return new Promise((resolve, reject) => {
    dispatch(createDatapoint(values)).then(
      (data) => {
        if (data) { // todo - extract this
          let newDatasetState = {...props.dataset};
          newDatasetState.datapoints.push(data.id);
          dispatch(updateDataset(newDatasetState)); // todo - handle this fail
          return resolve();
        }
        return reject({message: 'an error message from server'});
      },
      (error) => {
        return reject({message: `an error message: ${error}`});
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
