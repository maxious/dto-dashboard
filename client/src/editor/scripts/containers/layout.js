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
      }, this.props.config.ROUTE_TRANSITION_SCROLL_TOP_DELAY);
    }
  }

  render() {
    let { config } = this.props;
    return (
      <div>
        <Toast />
        <TransitionGroup
          transitionName={{enter: "fadeIn", leave:'fadeOut'}}
          transitionEnterTimeout={config.ROUTE_TRANSITION_ENTER}
          transitionLeaveTimeout={config.ROUTE_TRANSITION_LEAVE}
          component="div"
          className="stage--route">
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
