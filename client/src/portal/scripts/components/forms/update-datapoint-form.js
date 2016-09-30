import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form';

import { updateDatapoint } from './../../actions/datapoint';
import { isNumeric, isFloat } from 'validator';
import Input from './../fields/input';
import SubmitButton from './../submitButton';
import YyyyMmDate from './../fields/yyyyMmDate';


/**
 * Update Datapoint Form
 * @param props
 * @constructor
 */
let UpdateDatapointForm = props => {

  const {
    error, handleSubmit, pristine, submitting, valid,
    isSubmitting
  } = props;

  return (
    <form onSubmit={(e) => e.preventDefault()}>

      <Field component={YyyyMmDate} type="text" name="ts" label="Label"
             fieldProps={{readOnly:true, disabled:true}}
             optionProps={{}} />

      <Field component={Input} type="number" name="value" label="Value"
             fieldProps={{}}
             optionProps={{}} />

      <div>
        <SubmitButton type="submit"
                      btnText="Save"
                      submittingBtnText="Saving.."
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
 *    resolve is called, its' submitting prop will be true
 */
const submit = (values, dispatch, props) => {

  values.dataset_id = props.dataset.id;

  return new Promise((resolve, reject) => {
    dispatch(updateDatapoint(values)).then(
      (data) => {
        if (data) {
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

const validate = (values, props) => {
  const errors = {};

  if (!values.value) {
    errors.value = 'Required';
  } else if (!isFloat(String(values.value))) {
    errors.value = 'Must be a number.';
  }
  return errors;
};


const cancel = (props) => {
  props.reset(props.form);
  props.onCancelSuccess();
};


UpdateDatapointForm = reduxForm({
  form: 'updateDatapointForm',
  validate,
  destroyOnUnmount: true
})(UpdateDatapointForm);

UpdateDatapointForm = connect(
  (state, ownProps) => ({
    enableReinitialize: true
  }),
  (dispatch, ownProps) => ({
    initialValues: ownProps.formModel
  })
)(UpdateDatapointForm);

export default UpdateDatapointForm
