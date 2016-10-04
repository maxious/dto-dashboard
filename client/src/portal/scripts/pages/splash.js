import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';


const mapStateToProps = (store, ownProps) => ({
  dashboards: ownProps.dashboards
});
const mapDispatchToProps = dispatch => ({});

class DashboardsIndex extends Component {

  render() {
    let { dashboards } = this.props;

    let sortedDashboards = dashboards.sort((a,b) => {
      return new Date(b.ts).getTime() - new Date(a.ts).getTime();
    });

    let editDashboardList = (dashboards) => {
      return (
        <ul>
          {dashboards.map((d, idx) => (
            <li key={idx}>
              <Link to={`/dashboards/${d.id}`} className="a--ui-kit">Edit {d.name}</Link>
            </li>
          ))}
        </ul>
      )
    };


    return (
      <div>

        <div className="row">
          <div className="col-xs-12">
            <h1>Welcome to the dashboard.gov.au Editor</h1>
            <p><strong>What would you like to do today?</strong></p>
          </div>

          <div className="col-xs-12 col-sm-4">
            <p>Create or update data:</p>
            <ul>
              <li><Link to="/datasets" className="a--ui-kit">Create or update data</Link></li>
            </ul>
            <br />
          </div>

          <div className="col-xs-12 col-sm-4">
            <p>Edit Dashboard content:</p>

            {sortedDashboards.length ?
              editDashboardList(sortedDashboards) :
              <p>No dashboards</p>
            }
            <br />
          </div>
        </div>

      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardsIndex);
