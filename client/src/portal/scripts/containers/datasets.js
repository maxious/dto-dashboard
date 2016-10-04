import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


const mapStateToProps = ({datasets}, ownProps) => ({
  datasets
});
const mapDispatchToProps = dispatch => ({});

class Dataset extends Component {
  render() {
    return (
      <div>
        {React.cloneElement(this.props.children, {
          datasets: this.props.datasets
        })}
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dataset);
