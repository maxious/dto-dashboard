import React, { PropTypes } from 'react';


export const Select = (props) => {

  const {
    input, name, label,
    fieldProps,
    optionProps: { isOptional, options },
    meta: { touched, error }
  } = props;

  return (
    <div className="form-group">
      <label htmlFor={name}
             className="control-label">{label}{isOptional === true && <sup> Optional</sup>}</label>
      <div>
        <select {...input} {...fieldProps}
                name={name}
                onBlur={() => {input.onBlur(input.value)}}
                id={name}
                className={touched && error ? `invalid` : ``}>
          <option value="">Select...</option>
          {options.map((o, idx) => (
            <option key={idx} value={o.value} disabled={o.disabled}>{o.label}</option>
          ))}
        </select>
        {touched && error && <span className="help-block">{error}</span>}
      </div>
    </div>
  )
};

Select.PropTypes = {
  props: PropTypes.shape({
    input: React.PropTypes.object.isRequired,
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    fieldProps: React.PropTypes.object.isRequired,
    optionProps: React.PropTypes.object.isRequired,
  })
};

export default Select;
