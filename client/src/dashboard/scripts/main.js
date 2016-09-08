import { merge } from 'lodash';
import domready from 'domready';
import { select, selectAll } from 'd3-selection';

import configureStore from './store/configureStore';
import initialState from './store/initialState';
import { createWidgets } from './../actions/widgets';
import { createDatasets } from './../actions/datasets';
import { createDatapoints } from './../actions/datapoints';
import DashboardShow from './containers/legacy-dashboard-show';


const bootState = merge(initialState, window.__INITIAL_STATE__);

const store = configureStore(bootState, true);


domready(() => {

  let _widgetsData = [];
  selectAll('.bar .widget__inner').each(function() {
    _widgetsData.push(JSON.parse(this.getAttribute('data-data')));
  });
  selectAll('.sparkline .widget__inner').each(function() {
    _widgetsData.push(JSON.parse(this.getAttribute('data-data')));
  });
  selectAll('.line .widget__inner').each(function() {
    _widgetsData.push(JSON.parse(this.getAttribute('data-data')));
  });
  selectAll('.pie .widget__inner').each(function() {
    _widgetsData.push(JSON.parse(this.getAttribute('data-data')));
  });
  selectAll('.fact .widget__inner').each(function() {
    _widgetsData.push(JSON.parse(this.getAttribute('data-data')));
  });

  // serialize
  _widgetsData.forEach((w) => {
    w.datasets.forEach((d) => {
      d.widget_id = w.id;
    });
    store.dispatch(createDatasets(w.datasets));
    delete w.datasets;
  });
  store.dispatch(createWidgets(_widgetsData));


  new DashboardShow(store);

});




