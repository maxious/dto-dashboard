import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';

import * as uiActions from './../actions/ui';
import CreateDatapointForm from './../components/forms/create-datapoint-form';


const mapStateToProps = ({ui}, ownProps) => {
  return {
    ui: ui.pageDatasetDatapointCreate,
    dataset: ownProps.dataset
  }
};
const mapDispatchToProps = dispatch => {
  return {
    push: bindActionCreators(push, dispatch),
    actions: bindActionCreators(uiActions, dispatch)
  }
};


class DatasetDatapointCreatePage extends Component {

  onSubmitSuccess() {
    this.props.push(`/datasets/${this.props.dataset.id}`);
  }

  render() {
    let { dataset, ui } = this.props;
    return (
      <div>
        <h1>Create datapoint</h1>

        <CreateDatapointForm
          dataset={dataset}
          onSubmitSuccess={this.onSubmitSuccess.bind(this)} />

      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetDatapointCreatePage);
