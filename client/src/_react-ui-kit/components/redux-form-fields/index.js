import React from 'react';


export const Input = (props) => {
  let { input, inputProps, label, type, name, meta: { touched, error } } = props;

  if (type === 'checkbox') {
    throw new Error('Use "checkbox" input instead.');
  }
  return (
    <div className="form-group">
      <label htmlFor={name}
             className="control-label">{label}</label>
      <div>
        <input {...input} {...inputProps}
               placeholder={label}
               type={type}
               name={name}
               id={name}
               className={touched && error ? `form-control invalid` : `form-control`} />
        {touched && error && <span className="help-block">{error}</span>}
      </div>
    </div>
  )
};

export const Checkbox = (props) => {
  let checked = false;
  if (props.input.value) {
    checked = props.input.value;
    delete props.input.value;
  }
  let { input, inputProps, label, name, meta: { touched, error } } = props;

  return (
    <div className="form-group">
      <input {...input} {...inputProps}
             checked={checked}
             type="checkbox"
             placeholder={label}
             name={name}
             id={name}
             className={touched && error ? `invalid` : ``} />
      <label htmlFor={name}>{label}</label>
      <div>
        {touched && error && <span className="help-block">{error}</span>}
      </div>
    </div>
  )
};

export const Textarea = (props) => {
  let { input, inputProps, label, name, meta: { touched, error } } = props;
  return (
    <div className="form-group">
      <label htmlFor={name}
             className="control-label">{label}</label>
      <div>
        <textarea {...input} {...inputProps}
                  placeholder={label}
                  name={name}
                  id={name}
                  className={touched && error ? `invalid` : ``} />
        {touched && error && <span className="help-block">{error}</span>}
      </div>
    </div>
  )
};

export const Select = (props) => {
  let { input, inputProps, label, name, options, meta: { touched, error } } = props;
  return (
    <div className="form-group">
      <label htmlFor={name}
             className="control-label">{label}</label>
      <div>
        <select {...input} {...inputProps}
                name={name}
                onBlur={() => {input.onBlur(input.value)}}
                id={name}
                className={touched && error ? `invalid` : ``}>
          {options.map((o, idx) => (
            <option key={idx} value={o.value}>{o.label}</option>
          ))}
        </select>
        {touched && error && <span className="help-block">{error}</span>}
      </div>
    </div>
  )
};
