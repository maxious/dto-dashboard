import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';

import * as uiActions from './../actions/ui';
import { getDatapointById } from './../reducers/datapoints';
import UpdateDatapointForm from './../components/forms/update-datapoint-form';


const mapStateToProps = ({datapoints, ui}, ownProps) => {
  return {
    ui: ui.pageDatasetDatapoint,
    dataset: ownProps.dataset,
    datapoint: getDatapointById(datapoints, ownProps.params.datapoint_id)
  }
};
const mapDispatchToProps = dispatch => ({
  push: bindActionCreators(push, dispatch),
  actions: bindActionCreators(uiActions, dispatch)
});

class DatasetDatapointPage extends Component {

  enterForm() {
    this.props.actions.editFormAtDatasetDatapointPage(true);
  }

  exitForm() {
    this.props.actions.editFormAtDatasetDatapointPage(false);
  }

  onSubmitSuccess() {
    this.exitForm();
    this.props.push(`/datasets/${this.props.dataset.id}`);
  }

  componentWillUnmount() {
    if (this.props.ui.isEditing) {
      this.exitForm();
    }
  }

  render() {
    let { datapoint, ui } = this.props;
    return (
      <div>

        <div className="row">
          <div className="col-xs-12">
            <h1>Dataset Datapoint</h1>

            <button
              className="btn primary small"
              disabled={ui.isEditing}
              onClick={this.enterForm.bind(this)}>Edit</button>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-lg-8">
            <UpdateDatapointForm
              formModel={datapoint}
              isEditing={ui.isEditing}
              onSubmitSuccess={this.onSubmitSuccess.bind(this)}
              onCancelSuccess={this.exitForm.bind(this)} />
          </div>
        </div>

      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetDatapointPage);
