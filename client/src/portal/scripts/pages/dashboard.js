import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import * as uiActions from './../actions/ui';
import UpdateDashboardForm from './../components/forms/update-dashboard-form';


const mapStateToProps = (store, ownProps) => ({
  dashboard: ownProps.dashboard,
  widgets: ownProps.widgets,
  ui: store.ui.pageDashboard
});
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(uiActions, dispatch)
  }
};

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

  render() {
    let { dashboard, widgets, ui } = this.props;
    return (
      <div>
        <h2>Dashboard: {dashboard.name}</h2>

        <button
          className="btn--primary btn--small"
          disabled={ui.isEditing}
          onClick={this.enterForm.bind(this)}>Edit</button>

        <UpdateDashboardForm
          formModel={dashboard}
          isEditing={ui.isEditing}
          onSubmitSuccess={this.onSubmitSuccess.bind(this)}
          onCancelSuccess={this.exitForm.bind(this)} />

        <div>
          <h3>Widgets</h3>
            <table>
            <thead>
            <tr>
              <td>ID</td><td>Name</td>
            </tr>
            </thead>
            <tbody>
            {widgets.map((w, idx) => (
              <tr key={idx}>
                <td>{w.id}</td><td>{w.name}</td><td><Link to={`/dashboards/${dashboard.id}/widgets/${w.id}`}>Edit</Link></td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardIndex);

