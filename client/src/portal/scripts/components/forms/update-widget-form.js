import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form';

import * as types from './../../actions/_types';
import { updateWidget } from './../../actions/widget';
import { isURL } from 'validator';
import { ISO_LONG_DATE } from './../../../../_ui-kit/lib/constants/date-time';
import {
  Input,
  DayMonthYearDate,
  Textarea,
  Select
} from './../../../../_react-ui-kit/components/redux-form-fields';


let UpdateWidgetForm = props => {

  const { error, handleSubmit, pristine, submitting, valid, isEditing } = props;

  return (
    <form onSubmit={(e) => e.preventDefault()}>

      <Field component={Input} name="name" type="text" label="Name"
             fieldProps={{disabled:!isEditing}}
             optionProps={{}} />

      <Field component={Select} name="type" label="Type"
             fieldProps={{disabled:!isEditing}}
             optionProps={{options:props.SELECT_WIDGET_TYPE}} />

      <Field component={Select} name="units" label="Units"
             fieldProps={{disabled:!isEditing}}
             optionProps={{options:props.SELECT_WIDGET_UNITS}} />

      <Field component={Textarea} name="description" label="Description"
             fieldProps={{disabled:!isEditing}}
             optionProps={{isOptional:true}} />

      <Field component={DayMonthYearDate} name='published_at' label='Published at'
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
 *    resolve is called, its' submitting prop will be true
 */
const submit = (values, dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(updateWidget(values)).then(
      (d) => {
        if (d.type === types.UPDATE_WIDGETS_FAIL) {  // todo // if (d.status === 202) {}
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

  if (!values.units) {
    errors.units = 'Required';
  }

  if (!values.description) {
    errors.description = 'Required';
  } else if (values.description.length > 240) {
    errors.description = 'Must be less than 240 characters';
  }

  if (!values.last_updated_at) {
    errors.last_updated_at = 'Required';
  }
  // todo - check date range

  return errors;
};

const cancel = (props) => {
  props.reset(props.form);
  props.onCancelSuccess();
};


UpdateWidgetForm = reduxForm({
  form: 'updateWidget',
  validate
})(UpdateWidgetForm);

UpdateWidgetForm = connect(
  (state, ownProps) => ({
    enableReinitialize: true,
    SELECT_WIDGET_TYPE: ownProps.SELECT_WIDGET_TYPE,
    SELECT_WIDGET_SIZE: ownProps.SELECT_WIDGET_SIZE,
    SELECT_WIDGET_UNITS: ownProps.SELECT_WIDGET_UNITS
  }),
  (dispatch, ownProps) => ({
    initialValues: ownProps.formModel
  })
)(UpdateWidgetForm);

export default UpdateWidgetForm
