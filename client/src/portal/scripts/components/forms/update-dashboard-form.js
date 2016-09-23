import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { isURL } from 'validator';

import * as types from './../../actions/_types';
import { updateDashboard } from './../../actions/dashboard';
import { ISO_LONG_DATE } from './../../../../_ui-kit/lib/constants/date-time';
import {
  Input,
  InputDate,
  Textarea
} from './../../../../_react-ui-kit/components/redux-form-fields';


/**
 * Update Dashboard Form
 * @param props
 * @constructor
 */
let UpdateDashboardForm = props => {

  const {
    error, handleSubmit, pristine, submitting, valid,
    isEditing
  } = props;

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Field component={Input} name='name' type='text' label='Name'
             fieldProps={{disabled:!isEditing}}
             optionProps={{}} />

      <Field component={Textarea} name='description' label='Description'
             fieldProps={{disabled:!isEditing}}
             optionProps={{}} />

      <Field component={Textarea} name='users' label='Users'
             fieldProps={{disabled:!isEditing}}
             optionProps={{}} />

      <Field component={Input} type='url' name='url' label='Url'
             fieldProps={{disabled:!isEditing}}
             optionProps={{isOptional:true}} />

      <Field component={Textarea} name='notes' label='Notes'
             fieldProps={{disabled:!isEditing}}
             optionProps={{isOptional:true}} />

      <Field component={InputDate} name='published_at' label='Published at'
             fieldProps={{readOnly:true}}
             optionProps={{format:ISO_LONG_DATE}} />

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
 *    resolve is called, its' submitting prop will be true
 */
const submit = (values, dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(updateDashboard(values)).then(
      (d) => {
        if (d.type === types.UPDATE_DASHBOARDS_FAIL) {  // todo // if (d.status === 202) {}
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

  if (!values.description) {
    errors.description = 'Required';
  } else if (values.description.length > 240) {
    errors.description = 'Must be less than 240 characters';
  }

  if (!values.users) {
    errors.users = 'Required';
  } else if (values.users.length > 240) {
    errors.users = 'Must be less than 240 characters';
  }

  if (values.url.length && isURL(values.url) === false) {
    errors.url = 'Must be a valid URL';
  }

  return errors;
};

const cancel = (props) => {
  props.reset(props.form);
  props.onCancelSuccess();
};


UpdateDashboardForm = reduxForm({
  form: 'updateDashboard',
  validate,
  destroyOnUnmount: true
})(UpdateDashboardForm);

UpdateDashboardForm = connect(
  (state, ownProps) => ({
    enableReinitialize: true
  }),
  (dispatch, ownProps) => ({
    initialValues: ownProps.formModel
  })
)(UpdateDashboardForm);

export default UpdateDashboardForm
