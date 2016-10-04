import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { push } from 'react-router-redux';

import { createDatapoint } from './../../actions/datapoint';
import { isNumeric } from 'validator';
import Input from './../fields/input';
import YyyyMmDate from './../fields/yyyyMmDate';
import SubmitButton from './../submitButton';


/**
 * Create Datapoint Form
 * @param props
 * @constructor
 */
let CreateDatapointForm = props => {

  const {
    error, handleSubmit, submitting, valid,
    exclusionDates, isSubmitting
  } = props;


  return (
    <form onSubmit={(e) => e.preventDefault()}>

      <Field component={YyyyMmDate} type="text" name="ts" label="Label"
             fieldProps={{}}
             optionProps={{exclusionDates:exclusionDates}} />

      <Field component={Input} name="value" type="number" label="Value"
             fieldProps={{autoFocus:true}}
             optionProps={{infoText: `To save as "No data" leave blank`}} />

      <div>
        <SubmitButton type="submit"
                btnText="Create"
                submittingBtnText="Creating.."
                isSubmitting={isSubmitting}
                className='btn primary'
                disabled={submitting || !valid}
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

  values.dataset_id = props.dataset.id;

  return new Promise((resolve, reject) => {
    dispatch(createDatapoint(values)).then(
      (data) => {
        // debugger
        if (data) { // todo - extract this
          let newDatasetState = {...props.dataset};
          newDatasetState.datapoints.push(data.id);
          // dispatch(updateDataset(newDatasetState)); // todo - handle this fail  // TDODO
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

  if (!values.ts) {
    errors.ts = 'Required';
  }

  if (values.value && !isFloat(String(values.value))) {
    errors.value = 'Must be blank or a number.';
  }

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


export default CreateDatapointForm;
