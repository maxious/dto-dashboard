import React, { Component } from 'react';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import { connect } from 'react-redux';

import Toast from './../components/toast';


class Layout extends Component {

  componentDidUpdate() {
    let appScrollNode = document.getElementsByClassName('l-app');
    if (appScrollNode && appScrollNode.length) {
      setTimeout(() => {
        appScrollNode[0].scrollTop = 0;
      }, 400);
    }
  }

  render() {
    return (
      <div className="app-scene">
        <Toast />
        <TransitionGroup
          transitionName={{enter: "fadeIn", leave:'fadeOut'}}
          transitionEnterTimeout={400}  // total time
          transitionLeaveTimeout={200}  // total time
          component="div"
          className="app-page-parent">
            {React.cloneElement(this.props.children, {
              key: this.props.location.pathname
            })}
        </TransitionGroup>
      </div>
    )
  }
}

const mapStateToProps = ({config}) => ({
  config
});

export default connect(
  mapStateToProps,
  null
)(Layout);
