import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';

import Breadcrumbs from './../components/breadcrumbs';
import { humanisedLongDate } from './../utils/humanisedDates';


const mapStateToProps = ({datapoints}, ownProps) => {
  return {
    datasets: ownProps.datasets,
    datapoints
  }
};
const mapDispatchToProps = dispatch => ({
  push: bindActionCreators(push, dispatch)
});


class DatasetsIndex extends Component {

  render() {
    let {
      datasets,
      datapoints,
    } = this.props;

    let sortedDatasets = datasets.sort((a,b) => {
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });


    let viewDatasetsList = (datasets) => {
      return (
        <table className="content-table">
          <thead>
          <tr>
            <td>ID</td><td>Name</td><td>Last updated</td><td>No. of datapoints</td><td colSpan="2"></td>
          </tr>
          </thead>
          <tbody>
          {datasets.map((d, idx) => (
            <tr key={idx}>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>{humanisedLongDate(d.updated_at)}</td>
              <td>{d.datapoints.length}</td>
              <td><Link to={`/datasets/${d.id}`} className="a--ui-kit">Edit</Link></td>
              <td><Link to={`/datasets/${d.id}/datapoints-new`} className="a--ui-kit">Create datapoint</Link></td>
            </tr>
          ))}
          </tbody>
        </table>
      )
    };

    return (
      <div className="container">

        <div className="row">
          <div className="col-xs-12">
            <Breadcrumbs paths={[
              {path:'/', name:'Home'},
              {path:`/datasets`, name:`Datasets`}
            ]} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <h1>Datasets</h1>

            {sortedDatasets.length && viewDatasetsList(sortedDatasets)}
          </div>
        </div>

      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetsIndex);
