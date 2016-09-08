import { select, selectAll } from 'd3-selection';
import { createWidgets } from './../actions/widgets';
import { createDatasets } from './../actions/datasets';
import { createDatapoints } from './../actions/datapoints';

import FactWidget from './../legacy-components/Widgets/FactWidget';


class LegacyDashboardShow {

  constructor(store) {
    let self = this;
    store.subscribe((oldState, newState) => {
      if (!oldState) {
        self.props = newState;
        self.render();
      }
      // if (newState !== oldState) {
      // no requirement to handle this at this stage
      // }
    });
    this.serializeWidgets(this.fetchWidgets(), store.dispatch);
  }

  serializeWidgets(widgets, dispatch) {
    widgets.forEach((w) => {
      w.datasets.forEach((d) => {
        d.widget_id = w.id;
      });
      dispatch(createDatasets(w.datasets));
      delete w.datasets;
    });
    dispatch(createWidgets(widgets));
  }

  // todo - move this to main.js
  fetchWidgets() {
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
    return _widgetsData;
  }

  onPropsChange() {
    console.log(this.props);
    // todo
  }

  render() {
    this.props.widgets.forEach((w) => {
      let el = select(`[data-id="${w.id}"] .widget__inner`);

      switch (w.type) {
        // case 'bar':
        //   break;
        case 'fact':
          new FactWidget({
            description: w.description,
            element: el
          });
          break;
        // case 'pie':
        //   break;
      }
    });
  }

}

export default LegacyDashboardShow;

//
// let data = {
//   "id": 22,
//   "name": "Devices used by users",
//   "type": "bar",
//   "size": "medium",
//   "latest": {"value": "50.0", "label": "2016-07"},
//   "units": "%",
//   "definition": "This shows the types of devices used by users to access the appointment booking service.",
//   "description": "This shows the types of devices used by users to access the appointment booking service.",
//   "updated_at": "2016-09-06T06:09:17.793Z",
//   "prefix": "",
//   "suffix": "%",
//   "stacking": "percentage",
//   "displayRoundedData": true,
//   "datasets": [{
//     "id": "mobile",
//     "name": "Mobile",
//     "units": "i",
//     "notes": "note for this dataset",
//     "data": [{"value": "50.0", "label": "2016-07"}, {"value": "49.0", "label": "2016-06"}, {
//       "value": "47.0",
//       "label": "2016-05"
//     }, {"value": "48.0", "label": "2016-04"}, {"value": "43.0", "label": "2016-03"}]
//   }, {
//     "id": "tablet",
//     "name": "Tablet",
//     "units": "i",
//     "notes": "note for this dataset",
//     "data": [{"value": "3.0", "label": "2016-07"}, {"value": "2.0", "label": "2016-06"}, {
//       "value": "6.0",
//       "label": "2016-05"
//     }, {"value": "6.0", "label": "2016-04"}, {"value": "6.0", "label": "2016-03"}]
//   }, {
//     "id": "desktop",
//     "name": "Desktop",
//     "units": "i",
//     "notes": "note for this dataset",
//     "data": [{"value": "47.0", "label": "2016-07"}, {"value": "49.0", "label": "2016-06"}, {
//       "value": "47.0",
//       "label": "2016-05"
//     }, {"value": "46.0", "label": "2016-04"}, {"value": "51.0", "label": "2016-03"}]
//   }]
// }
