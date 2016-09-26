import React, { Component } from 'react';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import {
  ROUTE_TRANSITION_ENTER,
  ROUTE_TRANSITION_LEAVE,
  ROUTE_TRANSITION_SCROLL_TOP_DELAY
} from './../config';


export default class Layout extends Component {

  componentDidUpdate() {
    let appScrollNode = document.getElementsByClassName('l-app');
    if (appScrollNode && appScrollNode.length) {
      setTimeout(() => {
        appScrollNode[0].scrollTop = 0;
      }, ROUTE_TRANSITION_SCROLL_TOP_DELAY);
    }
  }

  render() {
    return (
      <div>
        <TransitionGroup
          transitionName={{enter: "fadeIn", leave:'fadeOut'}}
          transitionEnterTimeout={ROUTE_TRANSITION_ENTER}
          transitionLeaveTimeout={ROUTE_TRANSITION_LEAVE}
          component="div"
          className="stage--route">
            {React.cloneElement(this.props.children, {
              key: this.props.location.pathname             // todo - make breadcrumb from this object
            })}
        </TransitionGroup>
      </div>
    )
  }
}
