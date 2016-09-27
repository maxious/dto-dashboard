import React, { Component, PropTypes } from 'react';


const Button = ({btnText, submittingBtnText, isSubmitting = false, ...attributes}) => {
  if (!btnText) console.warn('must provide btnText');
  if (!submittingBtnText) console.warn('must provide submittingBtnText');
  return (
    <button {...attributes}>{isSubmitting ? submittingBtnText : btnText}</button>
  )
};

export default Button;
