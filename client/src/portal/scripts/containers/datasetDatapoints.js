import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getDatapointsById } from './../reducers/datapoints';


const mapStateToProps = ({datapoints}, ownProps) => {
  const dataset = ownProps.dataset;
  return {
    dataset,
    datapoints: getDatapointsById(datapoints, dataset.datapoints)
  }
};
const mapDispatchToProps = dispatch => ({});

class Dashboards extends Component {
  render() {
    let { children, dataset, datapoints } = this.props;
    return (
      <div>
        {React.cloneElement(children, {
          dataset,
          datapoints
        })}
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboards);
