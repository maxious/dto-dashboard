import React, { Component } from 'react';
import { connect } from 'react-redux'

import * as actionCreators from './../actions/toast';


const TYPES = ['success', 'error', 'info', 'warning'];

/**
 * Toast
 * Currently can only accept a single toast
 * todo - allow to accept array of toast
 */
class Toast extends Component {

  getToastClassName(level) {
    return TYPES.includes(level) ? `toast--${level}` : 'toast';
  }

  componentDidMount() {
    this.timeout = setTimeout(
      () => this.props.clearToast(this.props.id),
      3000
    )
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  render() {
    const {id, message, level} = this.props;
    return (
      <div key={id} className={this.getToastClassName(level)}>
        {message}
      </div>
    )
  }
}

const Toasts = ({toast, clearToast}) => {
  return (
    <div className="toast-container" aria-live="polite" role="alert">
      {toast && toast.message &&
      <Toast
        {...toast}
        key={toast.id}
        clearToast={clearToast}
      />
      }
    </div>
  )
};


const mapStateToProps = ({ui}) => ({
  toast: ui.toast
});
export default connect(
  mapStateToProps,
  actionCreators
)(Toasts);
