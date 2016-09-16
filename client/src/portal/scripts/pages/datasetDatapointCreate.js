import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import CreateDatapointForm from './../components/forms/create-datapoint-form';


const mapStateToProps = (store, ownProps) => ({
  dataset: ownProps.dataset
});
const mapDispatchToProps = dispatch => ({
  push: bindActionCreators(push, dispatch)
});

class DatasetDatapointCreatePage extends Component {

  onSubmitSuccess() {
    console.log('called DatasetDatapointCreatePage:onSuccess', this.props.dataset.id);  // todo - remove
    this.props.push(`/datasets/${this.props.dataset.id}`);
  }

  render() {
    let { dataset } = this.props;
    return (
      <div>
        <h1>Create datapoint</h1>

        <CreateDatapointForm onSubmitSuccess={this.onSubmitSuccess.bind(this)} />

      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetDatapointCreatePage);
