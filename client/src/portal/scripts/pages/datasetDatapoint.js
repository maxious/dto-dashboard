import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';

import Breadcrumbs from './../components/breadcrumbs';
import * as uiActions from './../actions/ui';
import { getDatapointById, computeLabel } from './../reducers/datapoints';
import UpdateDatapointForm from './../components/forms/update-datapoint-form';
import { getRequestKey } from './../actions/datapoint';
import { isPendingRequest } from './../reducers/requests';


const mapStateToProps = ({datapoints, ui, requests}, ownProps) => {
  let dataset = ownProps.dataset;
  let datapoint = getDatapointById(datapoints, ownProps.params.datapoint_id);
  let requestKey = getRequestKey(datapoint.id, 'update');
  return {
    ui: ui.pageDatasetDatapoint,
    dataset,
    datapoint,
    isPendingRequest: isPendingRequest(requests, requestKey)
  }
};
const mapDispatchToProps = dispatch => ({
  push: bindActionCreators(push, dispatch),
  actions: bindActionCreators(uiActions, dispatch)
});

class DatasetDatapointPage extends Component {

  componentDidMount() {
    this.props.actions.editFormAtDatasetDatapointPage(true);
  }

  exitForm() {
    this.props.actions.editFormAtDatasetDatapointPage(false);
    this.props.push(`/datasets/${this.props.dataset.id}`);
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
    let { datapoint, dataset, isPendingRequest } = this.props;
    return (
      <div>

        <div className="row">
          <div className="col-xs-12">
            <Breadcrumbs paths={[
              {path:`/datasets/${dataset.id}`, name:`${dataset.name}`},
              {path:`/datasets/${dataset.id}/datapoints/${datapoint.id}`, name:`${computeLabel(datapoint.ts)}`},
            ]} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <h1>Dataset Datapoint</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-lg-8">
            <UpdateDatapointForm
              formModel={datapoint}
              dataset={dataset}
              isSubmitting={isPendingRequest}
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
