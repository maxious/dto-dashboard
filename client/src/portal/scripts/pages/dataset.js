import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as uiActions from './../actions/ui';
import { getDatapointsById } from './../reducers/datapoints';
import UpdateDatasetForm from './../components/forms/update-dataset-form';


const mapStateToProps = ({datapoints, ui}, ownProps) => {
  let dataset = ownProps.dataset;
  return {
    dataset,
    datapoints: getDatapointsById(datapoints, dataset.datapoints),
    ui: ui.pageDataset
  }
};
const mapDispatchToProps = dispatch => ({
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

  render() {
    let { dataset, datapoints, ui } = this.props;
    return (
      <div>

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
          <div className="col-xs-8">
            <UpdateDatasetForm
              formModel={dataset}
              isEditing={ui.isEditing}
              onSubmitSuccess={this.onSubmitSuccess.bind(this)}
              onCancelSuccess={this.exitForm.bind(this)} />
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
