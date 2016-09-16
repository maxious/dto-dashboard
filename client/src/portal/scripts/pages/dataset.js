import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { getDatapointsByDatasetId } from './../reducers/datapoints';
import UpdateDatasetForm from './../components/forms/update-dataset-form';


const mapStateToProps = ({datapoints}, ownProps) => {
  let dataset = ownProps.dataset;
  return {
    dataset,
    datapoints: getDatapointsByDatasetId(datapoints, dataset.id)
  }
};
const mapDispatchToProps = dispatch => ({});

class DatasetIndex extends Component {

  onSubmitSuccess() {
    console.log('do something with submit success for dataset');
  }

  render() {
    let { dataset, datapoints } = this.props;
    return (
      <div>
        <h1>Dataset: {dataset.name}</h1>

        <Link to={`/datasets/${dataset.id}/datapoints-new`}>Create new</Link>

        <UpdateDatasetForm initialValues={dataset} onSubmitSuccess={this.onSubmitSuccess.bind(this)} />

        <div>
          <h3>Datapoints</h3>
          <table>
            <thead>
            <tr>
              <td>ID</td><td colSpan="2">Label</td>
            </tr>
            </thead>
            <tbody>
            {datapoints.map((d, idx) => (
              <tr key={idx}>
                <td>{d.id}</td><td>{d.label}</td><td><Link to={`/datasets/${dataset.id}/datapoints/${d.id}`}>Edit</Link></td>
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
)(DatasetIndex);
