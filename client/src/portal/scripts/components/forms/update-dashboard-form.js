import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { isURL } from 'validator';

import { updateDashboard } from './../../actions/dashboard';
import { ISO_LONG_DATE } from './../../../../_ui-kit/lib/constants/date-time';
import Input from './../fields/input';
import InputDate from './../fields/inputDate';
import Textarea from './../fields/textarea';
import SubmitButton from './../submitButton';


/**
 * Update Dashboard Form
 * @param props
 * @constructor
 */
let UpdateDashboardForm = props => {

  const {
    error, handleSubmit, pristine, submitting, valid,
    isEditing, isSubmitting
  } = props;

  return (
    <form onSubmit={(e) => e.preventDefault()}>

      <Field component={Input} name='name' type='text' label='Name'
             fieldProps={{disabled:!isEditing}}
             optionProps={{}} />

      <Field component={Textarea} name='description' label='Description'
             fieldProps={{disabled:!isEditing}}
             optionProps={{}} />

      <Field component={Textarea} name='target_users' label='Users Text'
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
        <SubmitButton type="submit"
                      btnText="Save"
                      submittingBtnText="Saving.."
                      isSubmitting={isSubmitting}
                      className='btn primary'
                      disabled={pristine || submitting || !valid}
                      onClick={handleSubmit(submit.bind(this))} />
        <button type="cancel"
                className='btn primary-link'
                disabled={!isEditing || submitting}
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
const submit = (values, dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(updateDashboard(values)).then(
      (data) => {
        // debugger
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
