import React, { PropTypes } from 'react';


const Textarea = (props) => {

  let {
    input, name, label,
    fieldProps,
    optionProps: { isOptional },
    meta: { touched, error }
  } = props;

  fieldProps = {autoComplete:'off',rows:5, ...fieldProps};

  return (
    <div className="form-group">
      <label htmlFor={name}
             className="control-label">{label}{isOptional === true && <sup> Optional</sup>}</label>
      <div>
        <textarea {...input} {...fieldProps}
                  name={name}
                  id={name}
                  className={touched && error ? `invalid` : ``} />
        {touched && error && <span className="help-block">{error}</span>}
      </div>
    </div>
  )
};

Textarea.propTypes = {
  props: PropTypes.shape({
    input: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    fieldProps: PropTypes.object.isRequired,
    optionProps: PropTypes.object.isRequired,
  })
};

export default Textarea;
