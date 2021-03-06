import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';

import Breadcrumbs from './../components/breadcrumbs';
import * as uiActions from './../actions/ui';
import { getDatapointsById, computeLabel } from './../reducers/datapoints';
import UpdateDatasetForm from './../components/forms/updateDatasetForm';
import { getRequestKey } from './../actions/dataset';
import { isPendingRequest } from './../reducers/requests';


const mapStateToProps = ({datapoints, ui, config, requests}, ownProps) => {
  let dataset = ownProps.dataset;
  let requestKey = getRequestKey(dataset.id, 'update');
  return {
    dataset,
    datapoints: getDatapointsById(datapoints, dataset.datapoints),
    ui: ui.pageDataset,
    isPendingRequest: isPendingRequest(requests, requestKey),
    config
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

  componentWillUnmount() {
    if (this.props.ui.isEditing) {
      this.exitForm();
    }
  }

  render() {
    let {
      dataset,
      datapoints,
      ui,
      isPendingRequest,
      config: { OPTIONS_DATASET_LABEL }
    } = this.props;

    let sortedDatapoints = datapoints.sort((a,b) => {
      return new Date(b.ts).getTime() - new Date(a.ts).getTime();
    });

    let editDatapointsList = (datapoints) => {
      return (
        <table className="content-table">
          <thead>
          <tr>
            <td>ID</td><td>Label</td><td colSpan="2">Value</td>
          </tr>
          </thead>
          <tbody>
          {datapoints.map((d, idx) => (
            <tr key={idx}>
              <td>{d.id}</td>
              <td>{computeLabel(d.ts)}</td>
              <td>{d.value || 'No data'}</td>
              <td><Link to={`/datasets/${dataset.id}/datapoints/${d.id}`} className="a--ui-kit">Edit</Link></td>
            </tr>
          ))}
          </tbody>
        </table>
      )
    };

    return (
      <div className="container">

        <div className="row">
          <div className="col-xs-12">
            <Breadcrumbs paths={[
              {path:'/', name:'Home'},
              {path:`/datasets`, name:`Datasets`},
              {path:`/datasets/${dataset.id}`, name:`${dataset.name}`}
            ]} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-lg-8">
            <h1>Dataset: {dataset.name}</h1>

            <button
              className="btn primary small"
              disabled={ui.isEditing}
              onClick={this.enterForm.bind(this)}>Edit</button>

            <UpdateDatasetForm
              formModel={dataset}
              isEditing={ui.isEditing}
              isSubmitting={isPendingRequest}
              onSubmitSuccess={this.onSubmitSuccess.bind(this)}
              onCancelSuccess={this.exitForm.bind(this)}
              OPTIONS_DATASET_LABEL={OPTIONS_DATASET_LABEL} />
          </div>
        </div>


        <div className="row">
          <div className="col-xs-12">

            <h2 className="h4">Datapoints</h2>

            <Link to={`/datasets/${dataset.id}/datapoints-new`} className="btn primary ghost">Create new datapoint</Link>


            {sortedDatapoints.length ?
              editDatapointsList(sortedDatapoints) :
              <p><em>No datapoints</em></p>
            }
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
