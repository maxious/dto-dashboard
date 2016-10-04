import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRedirect, IndexRoute } from 'react-router';

import Layout from './layout';

import Dashboard from './dashboard';
import Dashboards from './dashboards';
import Dataset from './dataset';
import Datasets from './datasets';
import DatasetDatapoints from './datasetDatapoints';

import SplashPage from './../pages/splash';
import DashboardPage from './../pages/dashboard';
import DashboardWidgetPage from './../pages/dashboardWidget';
import DatasetPage from './../pages/dataset';
import DatasetsPage from './../pages/datasets';
import DatasetDatapointPage from './../pages/datasetDatapoint';
import DatasetDatapointCreatePage from './../pages/datasetDatapointCreate';

import NoMatch from './../pages/noMatch';


export default class Root extends Component {

  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  onEnter() {
    return () => {};
  }

  render() {
    let { store, history } = this.props;
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={Layout}>

            /*

             /
             dashboards/1
             dashboards/1/widgets/1
             datasets
             datasets/id
             datasets/id/datapoints/1
             datasets/id/datapoints-new

             */

            {/*<IndexRedirect to="" />*/}

            <Route path="" component={Dashboards}>
              <IndexRoute component={SplashPage} onEnter={this.onEnter.bind(this)} />
              <Route path="dashboards/:dashboard_id" component={Dashboard}>
                <IndexRoute component={DashboardPage} />
                <Route path="widgets/:widget_id" component={DashboardWidgetPage} onEnter={this.onEnter.bind(this)} />
              </Route>
            </Route>

            <Route path="datasets" component={Datasets}>
              <IndexRoute component={DatasetsPage} onEnter={this.onEnter.bind(this)} />

              <Route path=":dataset_id" component={Dataset}>
                <IndexRoute component={DatasetPage} onEnter={this.onEnter.bind(this)} />

                <Route component={DatasetDatapoints}>
                  <Route path="datapoints/:datapoint_id" component={DatasetDatapointPage} onEnter={this.onEnter.bind(this)} />
                  <Route path="datapoints-new" component={DatasetDatapointCreatePage} onEnter={this.onEnter.bind(this)} />
                </Route>
              </Route>
            </Route>

            <Route path="*" component={NoMatch} />

          </Route>
        </Router>
      </Provider>
    )
  }
};

