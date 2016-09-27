import React, { PropTypes } from 'react';


const Checkbox = (props) => {
  let checked = false;
  if (props.input.value) {
    checked = props.input.value;
    delete props.input.value;
  }

  const {
    input, name, label,
    fieldProps,
    optionProps: { isOptional },
    meta: { touched, error }
  } = props;

  return (
    <div className="form-group">
      <input {...input} {...fieldProps}
             checked={checked}
             type="checkbox"
             name={name}
             id={name}
             className={touched && error ? `invalid` : ``} />
      <label htmlFor={name}>{label}{isOptional === true && <sup> Optional</sup>}</label>
      <div>
        {touched && error && <span className="help-block">{error}</span>}
      </div>
    </div>
  )
};

Checkbox.propTypes = {
  props: PropTypes.shape({
    input: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    fieldProps: PropTypes.object.isRequired,
    optionProps: PropTypes.object.isRequired,
  })
};

export default Checkbox;
