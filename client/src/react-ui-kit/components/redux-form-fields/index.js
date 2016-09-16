import React from 'react';


export const Input = (props) => {
  let { input, label, type, name, disabled, meta: { touched, error } } = props;

  if (type === 'checkbox') {
    throw new Error('Use "checkbox" input instead.');
  }
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} name={name} id={name} disabled={disabled} className={touched && error ? `invalid` : ``} />
        {touched && error && <span className="field___error">{error}</span>}
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
  let { input, label, name, disabled, meta: { touched, error } } = props;

  return (
    <div className="field">
      <input {...input} checked={checked} type="checkbox" placeholder={label} name={name} disabled={disabled} id={name} className={touched && error ? `invalid` : ``} />
      <label htmlFor={name}>{label}</label>
      <div>
        {touched && error && <span className="field___error">{error}</span>}
      </div>
    </div>
  )
};

export const Textarea = (props) => {
  let { input, label, name, disabled, rows, meta: { touched, error } } = props;
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <div>
        <textarea {...input} placeholder={label} name={name} id={name} disabled={disabled} className={touched && error ? `invalid` : ``} rows={rows || `3`} />
        {touched && error && <span className="field___error">{error}</span>}
      </div>
    </div>
  )
};

export const Select = (props) => {
  let { input, label, name, options, disabled, meta: { touched, error } } = props;
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <div>
        <select {...input} name={name} onBlur={() => {input.onBlur(input.value)}} disabled={disabled} id={name} className={touched && error ? `invalid` : ``}>
          {options.map((o, idx) => (
            <option key={idx} value={o.value}>{o.label}</option>
          ))}
        </select>
        {touched && error && <span className="field___error">{error}</span>}
      </div>
    </div>
  )
};
