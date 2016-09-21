import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form';

import * as types from './../../actions/_types';
import { updateWidget } from './../../actions/widget';
import { isURL } from 'validator';

import {
  Input,
  Checkbox,
  Textarea,
  Select
} from './../../../../_react-ui-kit/components/redux-form-fields';


let UpdateWidgetForm = props => {

  const { error, handleSubmit, pristine, submitting, valid, isEditing } = props;

  return (
    <form onSubmit={(e) => e.preventDefault()}>

      {/*id: 1,*/}
      {/*row: 0,*/}
      {/*pos: 0,*/}
      <Field name="name" type="text" component={Input} label="Name" inputProps={{disabled:!isEditing}} />

      <Field name="type" options={[
        { value: 'full', label: 'Full' },
        { value: 'kpi-sparkline', label: 'Kpi Sparkline' },
        { value: 'bar', label: 'Bar' },
        { value: 'fact', label: 'Fact' },
        { value: 'pie', label: 'Pie' }
      ]} component={Select} label="Type" inputProps={{disabled:!isEditing}} />

      <Field name="size" options={[
        { value: 'extra-small', label: 'Extra Small' },
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'large', label: 'Large' },
        { value: 'extra-large', label: 'Extra Large' }
      ]} component={Select} label="Size" inputProps={{disabled:!isEditing}} />

      <Field name="units" options={[
        { value: '%', label: 'Percentage' },
        { value: '$', label: 'Currency' },
        { value: 'n', label: 'Number' },
        { value: 'f', label: 'Float' },
        { value: 's', label: 'Seconds' }
      ]} component={Select} label="Units" inputProps={{disabled:!isEditing}} />
      <Field name="description" component={Textarea} label="Description" inputProps={{disabled:!isEditing}} />
      {/*options: {},*/}
      <Field name="is_hero" component={Checkbox} label="Is hero?" inputProps={{disabled:!isEditing}} />
      {/*last_updated_at: '2016-09-06 05:28:50.365576',*/}
      {/*created_at: '2016-09-06 05:28:50.356717',*/}
      {/*updated_at: '2016-09-06 05:28:50.366554',*/}

      <div>
        <button type="submit" className='btn primary' disabled={pristine || submitting || !valid} onClick={handleSubmit(submit.bind(this))}>Save</button>
        <button type="cancel" className='btn link primary' disabled={!isEditing || submitting} onClick={cancel.bind({}, props)}>Cancel</button>
      </div>
      {error && <strong style={{color:'red'}}>{error}</strong>}
    </form>
  )
};


const cancel = (props) => {
  props.reset(props.form);
  props.onCancelSuccess();
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
    dispatch(updateWidget(values)).then(
      (data) => {
        if (data.type === types.UPDATE_WIDGETS_FAIL) {  // todo // if (data.status === 202) {}
          reject(data);
        }
        // dispatch(stopLoading());
        resolve(data.payload);
      },
      (error) => {
        reject(error);
      }
    );
  }).catch((data) => {
    // dispatch(stopLoading());

    console.log('error happened', data)
    // todo - check error and fail accordingly
    throw new SubmissionError({ name: 'DUMMY ERROR', _error: 'Submit failed!' });
  });
};



const validate = (values, props) => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Required';
  }

  // if (!values.notes) {
  //   errors.notes = 'Required';
  // }
  //
  // if (!values.url) {
  //   errors.url = 'Required';
  // } else if (isURL(values.url) === false) {
  //   errors.url = 'Must be a valid URL';
  // }

  return errors;
};

// decorate
UpdateWidgetForm = reduxForm({
  form: 'updateWidget',
  validate
})(UpdateWidgetForm);

UpdateWidgetForm = connect(
  (state, ownProps) => ({
    enableReinitialize: true
  }),
  (dispatch, ownProps) => ({
    initialValues: ownProps.formModel
  })
)(UpdateWidgetForm);

export default UpdateWidgetForm
