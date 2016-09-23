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
    dataset: ownProps.dataset,
    exclusionDates: ownProps.datapoints.map(i => i.ts)
  }
};
const mapDispatchToProps = dispatch => ({
  push: bindActionCreators(push, dispatch),
  actions: bindActionCreators(uiActions, dispatch),
});


class DatasetDatapointCreatePage extends Component {

  onSubmitSuccess() {
    this.props.push(`/datasets/${this.props.dataset.id}`);
  }

  exitForm() {
    this.props.actions.editFormAtDatasetDatapointCreatePage(false);
  }

  componentWillUnmount() {
    if (this.props.ui.isEditing) {
      this.exitForm();
    }
  }

  render() {
    let { dataset, exclusionDates } = this.props;
    console.log(exclusionDates);
    return (
      <div>

        <div className="row">
          <div className="col-xs-12">
            <h1>Create datapoint</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-lg-8">
            <CreateDatapointForm
              dataset={dataset}
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
