import React, { PropTypes } from 'react';


const Button = ({btnText, submittingBtnText, isSubmitting = false, ...attrs}) => {
  let text = btnText;
  if (submittingBtnText) {
    text = isSubmitting ? submittingBtnText : btnText;
  }
  return (
    <button {...attrs}>{text}</button>
  )
};

Button.propTypes = {
  btnText: PropTypes.string.isRequired,
  submittingBtnText: PropTypes.string,
  isSubmitting: PropTypes.bool
};

export default Button;
