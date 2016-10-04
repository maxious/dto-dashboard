import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import * as uiActions from './../actions/ui';
import UpdateDashboardForm from './../components/forms/updateDashboardForm';
import Breadcrumbs from './../components/breadcrumbs';
import { getRequestKey } from './../actions/dashboard';
import { isPendingRequest } from './../reducers/requests';


const mapStateToProps = ({ui, requests}, ownProps) => {
  let dashboard = ownProps.dashboard;
  let requestKey = getRequestKey(dashboard.id, 'update');
  return {
    dashboard,
    widgets: ownProps.widgets,
    ui: ui.pageDashboard,
    isPendingRequest: isPendingRequest(requests, requestKey)
  };
};
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(uiActions, dispatch)
});

class DashboardIndex extends Component {

  enterForm() {
    this.props.actions.editFormAtDashboardPage(true);
  }

  exitForm() {
    this.props.actions.editFormAtDashboardPage(false);
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
      dashboard,
      widgets,
      ui,
      isPendingRequest
    } = this.props;

    let sortedWidgets = widgets.sort((a,b) => {
      return new Date(b.ts).getTime() - new Date(a.ts).getTime();
    });

    let editWidgetsList = (widgets) => {
      return (
        <table className="content-table">
          <thead>
          <tr>
            <td>ID</td><td>Name</td>
          </tr>
          </thead>
          <tbody>
          {sortedWidgets.map((w, idx) => (
            <tr key={idx}>
              <td>{w.id}</td><td>{w.name}</td><td><Link to={`/dashboards/${dashboard.id}/widgets/${w.id}`} className="a--ui-kit">Edit</Link></td>
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
              {path:'/', name:'Home'},
              {path:`/dashboards/${dashboard.id}`, name:`${dashboard.name}`}
            ]} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <h1>Dashboard: {dashboard.name}</h1>

            <button
              className="btn primary small"
              disabled={ui.isEditing}
              onClick={this.enterForm.bind(this)}>Edit</button>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-lg-8">
            <UpdateDashboardForm
              formModel={dashboard}
              isEditing={ui.isEditing}
              isSubmitting={isPendingRequest}
              onSubmitSuccess={this.onSubmitSuccess.bind(this)}
              onCancelSuccess={this.exitForm.bind(this)} />
          </div>
        </div>


        <div className="row">
          <div className="col-xs-12">
            <h2 className="h4">Widgets</h2>

            {sortedWidgets.length ?
              editWidgetsList(sortedWidgets) :
              <p><em>No widgets</em></p>
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
)(DashboardIndex);

