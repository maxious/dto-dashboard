import React, { Component } from 'react';
import moment from 'moment';


const InputDate = (props) => {

  let {
    input, name, label,
    fieldProps,
    optionProps: { isOptional, format },
    meta: { touched, error }
  } = props;

  fieldProps = {autoComplete:'off', ...fieldProps};
  let computedValue = moment(input.value).format(format);

  return (
    <div className="form-group">
      <label htmlFor={name}
             className="control-label">{label}{isOptional === true && <sup> Optional</sup>}</label>
      <div>
        <input type="hidden" {...input} name={name} />
        <input {...fieldProps}
               type="text"
               value={computedValue}
               id={name}
               className={touched && error ? `form-control invalid` : `form-control`} />
        {touched && error && <span className="help-block">{error}</span>}
      </div>
    </div>
  )
};

export default InputDate;
