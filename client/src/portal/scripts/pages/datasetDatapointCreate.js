import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';

import * as uiActions from './../actions/ui';
import CreateDatapointForm from './../components/forms/create-datapoint-form';


const mapStateToProps = ({ui}, ownProps) => ({
  ui: ui.pageDatasetDatapointCreate,
  dataset: ownProps.dataset
});
const mapDispatchToProps = dispatch => {
  return {
    push: bindActionCreators(push, dispatch),
    actions: bindActionCreators(uiActions, dispatch)
  }
};


class DatasetDatapointCreatePage extends Component {

  enterForm() {
    this.props.actions.editFormAtDatasetDatapointCreatePage(true);
  }

  exitForm() {
    this.props.actions.editFormAtDatasetDatapointCreatePage(false);
  }

  onSubmitSuccess() {
    this.exitForm();
    this.props.push(`/datasets/${this.props.dataset.id}`);
  }

  render() {
    let { dataset } = this.props;
    return (
      <div>
        <h1>Create datapoint</h1>

        <button
          className="btn--primary btn--small"
          disabled={ui.isEditing}
          onClick={this.enterForm.bind(this)}>Edit</button>

        <CreateDatapointForm
          dataset={dataset}
          isEditing={ui.isEditing}
          onSubmitSuccess={this.onSubmitSuccess.bind(this)}
          onCancelSuccess={this.exitForm.bind(this)} />

      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetDatapointCreatePage);
