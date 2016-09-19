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
    return (
      <div>
        <h1>Dashboards</h1>
        <table>
          <thead>
            <tr>
              <td>ID</td><td>Name</td>
            </tr>
          </thead>
          <tbody>
            {dashboards.map((d, idx) => (
              <tr key={idx}>
                <td>{d.id}</td><td>{d.name}</td><td><Link to={`/dashboards/${d.id}`}>Edit</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardsIndex);
