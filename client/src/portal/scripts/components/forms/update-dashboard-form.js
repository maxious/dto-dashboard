import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { isURL } from 'validator';

import * as types from './../../actions/_types';
import { updateDashboard } from './../../actions/dashboard';

import {
  Input,
  Checkbox,
  Textarea
} from './../../../../_react-ui-kit/components/redux-form-fields';


/**
 * Update Dashboard Form
 * @constructor
 */
let UpdateDashboardForm = props => {

  const { error, handleSubmit, pristine, submitting, valid, isEditing } = props;

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Field name="name" type="text" component={Input} label="Name" inputProps={{disabled:!isEditing}} />
      <Field name="notes" component={Textarea} label="Notes" inputProps={{disabled:!isEditing, rows:5}} />
      <Field name="url" type="url" component={Input} label="Url" inputProps={{disabled:!isEditing}} />
      <Field name="display_hero" component={Checkbox} label="Display hero" inputProps={{disabled:!isEditing}} />
      <Field name="display_kpis" component={Checkbox} label="Display kpi" inputProps={{disabled:!isEditing}} />
      <div>
        <button type="submit" className='btn primary' disabled={pristine || submitting || !valid} onClick={handleSubmit(submit.bind(this))}>Save</button>
        <button type="cancel" className='btn link primary' disabled={!isEditing || submitting} onClick={cancel.bind({}, props)}>Cancel</button>
      </div>
      {error && <strong style={{color:'red'}}>{error}</strong>}
    </form>
  )
};


/**
 * @param values
 * @param dispatch
 * @returns {Promise} - !important - this function *must* return Promise, until
 * resolve is called, its' submitting prop will be true
 */
const submit = (values, dispatch) => {
  // dispatch(startLoading());

  return new Promise((resolve, reject) => {
    dispatch(updateDashboard(values)).then(
      (d) => {
        if (d.type === types.UPDATE_DASHBOARDS_FAIL) {  // todo // if (data.status === 202) {}
          reject(data)
        }
        // dispatch(stopLoading());
        resolve(d.payload);
      },
      (error) => {
        reject(error);
      },
    ).catch((error) => {
      // dispatch(stopLoading());
      // todo - check error and fail accordingly
      throw new SubmissionError({name: 'Name does not exist', _error: 'Submit failed!'});
    });
  });
};

const validate = (values, props) => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Required';
  }

  if (!values.notes) {
    errors.notes = 'Required';
  }

  if (!values.url) {
    errors.url = 'Required';
  } else if (isURL(values.url) === false) {
    errors.url = 'Must be a valid URL';
  }

  return errors;
};

const cancel = (props) => {
  props.reset(props.form);
  props.onCancelSuccess();
};


// decorate
UpdateDashboardForm = reduxForm({
  form: 'updateDashboard',
  validate
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
