import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form';

import * as types from './../../actions/_types';
import { updateDatapoint } from './../../actions/datapoint';
import { isNumeric } from 'validator';
import Input from './../fields/input';


/**
 * Update Datapoint Form
 * @param props
 * @constructor
 */
let UpdateDatapointForm = props => {

  const {
    error, handleSubmit, pristine, submitting, valid,
    isEditing
  } = props;

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Field component={Input} type="text" name="label" label="Label"
             fieldProps={{readOnly:true}}
             optionProps={{}} />

      <Field component={Input} type="number" name="value" label="Value"
             fieldProps={{disabled:!isEditing}}
             optionProps={{}} />

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
 * @returns {Promise} - this function *must* return Promise, until
 * resolve is called, its' submitting prop will be true
 */
const submit = (values, dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(updateDatapoint(values)).then(
      (d) => {
        if (d.type === types.UPDATE_DATAPOINTS_FAIL) {  // todo // if (d.status === 202) {}
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

  if (values.number) {
    if (!isNumeric(values.number)) {
      errors.number = 'Must be a number.';
    }
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
