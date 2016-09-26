import React, { Component } from 'react';


const Input = (props) => {
  let {
    input, name, type, label,
    fieldProps,
    optionProps: { isOptional },
    meta: { touched, error }
  } = props;

  fieldProps = {autoComplete:'off', ...fieldProps};

  if (type === 'checkbox') {
    throw new Error('Use "checkbox" input instead.');
  }
  return (
    <div className="form-group">
      <label htmlFor={name}
             className="control-label">{label}{isOptional && <sup> Optional</sup>}</label>
      <div>
        <input {...input} {...fieldProps}
          type={type}
          name={name}
          id={name}
          className={touched && error ? `form-control invalid` : `form-control`} />
        {touched && error && <span className="help-block">{error}</span>}
      </div>
    </div>
  )
};

export default Input;
