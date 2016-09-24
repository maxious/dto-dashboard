import React, { Component } from 'react';
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import {
  ROUTE_TRANSITION_START_IN,
  // ROUTE_TRANSITION_START_OUT,   // => consumed by CSS props
  ROUTE_TRANSITION_END
} from './../config';


export default class Layout extends Component {

  componentDidUpdate() {
    let appScrollNode = document.getElementsByClassName('l-app');
    if (appScrollNode && appScrollNode.length) {
      setTimeout(() => {
        appScrollNode[0].scrollTop = 0;
      }, ROUTE_TRANSITION_START_IN);
    }
  }

  render() {
    return (
      <div>
        <TransitionGroup
          transitionName={{enter: "fadeIn", leave: "fadeOut"}}
          transitionEnterTimeout={ROUTE_TRANSITION_END}
          transitionLeaveTimeout={0}
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
