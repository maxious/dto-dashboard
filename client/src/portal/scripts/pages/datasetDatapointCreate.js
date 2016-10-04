import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';

import Breadcrumbs from './../components/breadcrumbs';
import * as uiActions from './../actions/ui';
import CreateDatapointForm from './../components/forms/createDatapointForm';
import { getRequestKey } from './../actions/datapoint';
import { isPendingRequest } from './../reducers/requests';


const mapStateToProps = ({ui, requests}, ownProps) => {
  let requestKey = getRequestKey(null, 'create');
  return {
    ui: ui.pageDatasetDatapointCreate,
    dataset: ownProps.dataset,
    exclusionDates: ownProps.datapoints.map(i => i.ts),
    isPendingRequest: isPendingRequest(requests, requestKey)
  }
};
const mapDispatchToProps = dispatch => ({
  push: bindActionCreators(push, dispatch),
  editForm: bindActionCreators(uiActions.editFormAtDatasetDatapointCreatePage, dispatch),
});


class DatasetDatapointCreatePage extends Component {

  onSubmitSuccess() {
    this.props.push(`/datasets/${this.props.dataset.id}`);
  }

  exitForm() {
    this.props.editForm(false);
    this.props.push(`/datasets/${this.props.dataset.id}`);
  }

  componentWillUnmount() {
    if (this.props.ui.isEditing) {
      this.exitForm();
    }
  }

  render() {
    let { dataset, exclusionDates, isPendingRequest } = this.props;

    return (
      <div>

        <div className="row">
          <div className="col-xs-12">
            <Breadcrumbs paths={[
              {path:'/', name:'Home'},
              {path:`/datasets/${dataset.id}`, name:`${dataset.name}`},
              {path:`/datasets/${dataset.id}/datapoints-new`, name:`Create datapoint`},
            ]} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <h1>Create datapoint</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-lg-8">
            <CreateDatapointForm
              dataset={dataset}
              isSubmitting={isPendingRequest}
              onSubmitSuccess={this.onSubmitSuccess.bind(this)}
              onCancelSuccess={this.exitForm.bind(this)}
              exclusionDates={exclusionDates} />
          </div>
        </div>

      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetDatapointCreatePage);
