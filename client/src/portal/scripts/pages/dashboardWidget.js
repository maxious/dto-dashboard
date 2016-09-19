import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import * as uiActions from './../actions/ui';
import { getWidgetById } from './../reducers/widgets';
import { getDatasetsByIds } from './../reducers/datasets';
import UpdateWidgetForm from './../components/forms/update-widget-form';


const mapStateToProps = ({datasets, ui}, ownProps) => {
  let widget = getWidgetById(ownProps.widgets, ownProps.params.widget_id);
  return {
    ui: ui.pageDashboardWidget,
    dashboard: ownProps.dashboard,
    widget,
    datasets: getDatasetsByIds(datasets, widget.datasets)
  }
};
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(uiActions, dispatch)
  }
};


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

  render() {
    let { widget, dashboard, datasets, ui } = this.props;
    return (
      <div>
        <h2>dashboard: {dashboard.name}</h2>
        <h2>widget: {widget.name}</h2>

        <button
          className="btn--primary btn--small"
          disabled={ui.isEditing}
          onClick={this.enterForm.bind(this)}>Edit</button>

        <UpdateWidgetForm
          formModel={widget}
          isEditing={ui.isEditing}
          onSubmitSuccess={this.onSubmitSuccess.bind(this)}
          onCancelSuccess={this.exitForm.bind(this)} />

        <div>
          <h3>Datasets</h3>
          <table>
            <thead>
            <tr>
              <td>ID</td><td>Name</td>
            </tr>
            </thead>
            <tbody>
            {datasets.map((d, idx) => (
              <tr key={idx}>
                <td>{d.id}</td><td>{d.name}</td><td><Link to={`/datasets/${d.id}`}>Edit</Link></td>
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
)(Widget);

