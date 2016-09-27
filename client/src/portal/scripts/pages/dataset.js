import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';

import Breadcrumbs from './../components/breadcrumbs';
import * as uiActions from './../actions/ui';
import { getDatapointsById } from './../reducers/datapoints';
import UpdateDatasetForm from './../components/forms/update-dataset-form';
import { getRequestKey } from './../actions/dataset';
import { isPendingRequest } from './../reducers/requests';


const mapStateToProps = ({datapoints, ui, app, requests}, ownProps) => {
  let dataset = ownProps.dataset;
  let requestKey = getRequestKey(dataset.id, 'update');
  return {
    dataset,
    datapoints: getDatapointsById(datapoints, dataset.datapoints),
    ui: ui.pageDataset,
    isPendingRequest: isPendingRequest(requests, requestKey),
    SELECT_DATASET_LABEL: app.SELECT_DATASET_LABEL
  }
};
const mapDispatchToProps = dispatch => ({
  push: bindActionCreators(push, dispatch),
  actions: bindActionCreators(uiActions, dispatch)
});


class DatasetIndex extends Component {

  enterForm() {
    this.props.actions.editFormAtDatasetPage(true);
  }

  exitForm() {
    this.props.actions.editFormAtDatasetPage(false);
  }

  onSubmitSuccess() {
    this.exitForm();
  }


  navToCreate() {
    this.props.push(`/datasets/${this.props.dataset.id}/datapoints-new`);
  }

  componentWillUnmount() {
    if (this.props.ui.isEditing) {
      this.exitForm();
    }
  }

  render() {
    let {
      dataset, datapoints, ui, isPendingRequest,
      SELECT_DATASET_LABEL
    } = this.props;
    return (
      <div>

        <div className="row">
          <div className="col-xs-12">
            <Breadcrumbs paths={[
              {path:`/datasets/${dataset.id}`, name:`${dataset.name}`},
            ]} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <h1>Dataset: {dataset.name}</h1>

            <button
              className="btn primary small"
              disabled={ui.isEditing}
              onClick={this.enterForm.bind(this)}>Edit</button>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-lg-8">
            <UpdateDatasetForm
              formModel={dataset}
              isEditing={ui.isEditing}
              isSubmitting={isPendingRequest}
              onSubmitSuccess={this.onSubmitSuccess.bind(this)}
              onCancelSuccess={this.exitForm.bind(this)}
              SELECT_DATASET_LABEL={SELECT_DATASET_LABEL} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <h2 className="h4">Datapoints</h2>

            <Link to={`/datasets/${dataset.id}/datapoints-new`} className="btn primary ghost">Create new</Link>

            <table className="content-table">
              <thead>
              <tr>
                <td>ID</td><td>Label</td><td colSpan="2">Value</td>
              </tr>
              </thead>
              <tbody>
              {datapoints.map((d, idx) => (
                <tr key={idx}>
                  <td>{d.id}</td><td>{d.label}</td><td>{d.value}</td><td><Link to={`/datasets/${dataset.id}/datapoints/${d.id}`} className="a--ui-kit">Edit</Link></td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetIndex);
