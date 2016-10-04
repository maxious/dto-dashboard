import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Breadcrumbs from './../components/breadcrumbs';
import * as uiActions from './../actions/ui';
import { getWidgetById } from './../reducers/widgets';
import { getDatasetsByIds } from './../reducers/datasets';
import UpdateWidgetForm from './../components/forms/updateWidgetForm';
import { getRequestKey } from './../actions/widget';
import { isPendingRequest } from './../reducers/requests';


const mapStateToProps = ({datasets, ui, requests, config}, ownProps) => {
  let widget = getWidgetById(ownProps.widgets, ownProps.params.widget_id);
  let requestKey = getRequestKey(widget.id, 'update');
  return {
    ui: ui.pageDashboardWidget,
    dashboard: ownProps.dashboard,
    widget,
    config,
    datasets: getDatasetsByIds(datasets, widget.datasets),
    isPendingRequest: isPendingRequest(requests, requestKey)
  }
};
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(uiActions, dispatch)
});


class Widget extends Component {

  enterForm() {
    this.props.actions.editFormAtDashboardWidgetPage(true);
  }

  exitForm() {
    this.props.actions.editFormAtDashboardWidgetPage(false);
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
      widget,
      dashboard,
      datasets,
      ui,
      isPendingRequest,
      config: { OPTIONS_WIDGET_TYPE, OPTIONS_WIDGET_SIZE, OPTIONS_WIDGET_UNITS}
    } = this.props;

    let sortedDatasets = datasets.sort((a,b) => {
      return new Date(b.ts).getTime() - new Date(a.ts).getTime();
    });

    let editDatasetsList = (datasets) => {
      return (
        <table className="content-table">
          <thead>
          <tr>
            <td>ID</td><td>Name</td>
          </tr>
          </thead>
          <tbody>
          {datasets.map((d, idx) => (
            <tr key={idx}>
              <td>{d.id}</td><td>{d.name}</td><td><Link to={`/datasets/${d.id}`} className="a--ui-kit">Edit</Link></td>
            </tr>
          ))}
          </tbody>
        </table>
      )
    };

    return (
      <div>

        <div className="row">
          <div className="col-xs-12">
            <Breadcrumbs paths={[
              {path:'/dashboards', name:'Dashboards'},
              {path:`/dashboards/${dashboard.id}`, name:`${dashboard.name}`},
              {path:`/dashboards/${dashboard.id}/widgets/${widget.id}`, name:`${widget.name}`}
            ]} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <h1>dashboard: {dashboard.name}, widget: {widget.name}</h1>

            <button
              className="btn primary small"
              disabled={ui.isEditing}
              onClick={this.enterForm.bind(this)}>Edit</button>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-lg-8">
            <UpdateWidgetForm
              formModel={widget}
              isEditing={ui.isEditing}
              isSubmitting={isPendingRequest}
              onSubmitSuccess={this.onSubmitSuccess.bind(this)}
              onCancelSuccess={this.exitForm.bind(this)}
              OPTIONS_WIDGET_TYPE={OPTIONS_WIDGET_TYPE}
              OPTIONS_WIDGET_SIZE={OPTIONS_WIDGET_SIZE}
              OPTIONS_WIDGET_UNITS={OPTIONS_WIDGET_UNITS}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <h2 className="h4">Datasets</h2>

            {sortedDatasets.length ?
              editDatasetsList(sortedDatasets) :
              <p><em>No datasets</em></p>
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
)(Widget);

