import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import * as actions from './../actions/ui';
import UpdateDashboardForm from './../components/forms/update-dashboard-form';


const mapStateToProps = (store, ownProps) => ({
  dashboard: ownProps.dashboard,
  widgets: ownProps.widgets,
  ui: store.ui
});
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
};

class DashboardIndex extends Component {

  constructor(props) {
    super(props);
  }

  enterForm() {
    console.log('enter form');
    this.props.actions.editDashboard(true, this.props.dashboard.id);
  }

  exitForm() {
    console.log('exit form');
    this.props.actions.editDashboard(false);
  }

  onSubmitSuccess() {
    console.log('do something with success');
    this.exitForm();
  }

  render() {
    let { dashboard, widgets, ui } = this.props;
    return (
      <div>
        <h2>Dashboard: {dashboard.name}</h2>

        <button
          className="btn--primary btn--small"
          disabled={ui.isEditing && ui.isEditing.id === dashboard.id}
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

