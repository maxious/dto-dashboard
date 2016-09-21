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
const mapDispatchToProps = dispatch => ({
  push: bindActionCreators(push, dispatch),
  actions: bindActionCreators(uiActions, dispatch)
});


class DatasetDatapointCreatePage extends Component {

  onSubmitSuccess() {
    this.props.push(`/datasets/${this.props.dataset.id}`);
  }

  render() {
    let { dataset } = this.props;
    return (
      <div>

        <div className="row">
          <div className="col-xs-12">
            <h1>Create datapoint</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-8">
            <CreateDatapointForm
              dataset={dataset}
              onSubmitSuccess={this.onSubmitSuccess.bind(this)} />
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
