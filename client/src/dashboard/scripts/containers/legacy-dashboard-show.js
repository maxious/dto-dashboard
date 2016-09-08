import { select } from 'd3-selection';

import convertDataForPie from './../legacy-components/Helpers/convertDataForPie'
import FactWidget from './../legacy-components/Widgets/FactWidget';
import { getWidgetDatasets } from './../reducers/widgets';


const C_HEIGHT = 150;

class LegacyDashboardShow {

  // charts: [];

  constructor(store) {
  }

  render(props) {
    let self = this;
    self.props = props;

    self.props.widgets.forEach((w) => {

      let el = select(`[data-id="${w.id}"] .widget__inner`);

      switch (w.type) {
        // case 'bar':

          // break;

        case 'fact':
          new FactWidget({
            description: w.description,
            element: el
          });
          break;

        case 'pie':
          let datasets = getWidgetDatasets(w);

          let chartData = convertDataForPie(datasets);
          if (chartData) {
            let options = {
              data: chartData,
              height: C_HEIGHT,
              element: el,
              type: widget.type,
              margin: {top: 0, right: 0, bottom: 0, left: 0},
              showLegend: true,
              showNullData: false,
              showOverlay: false,
              showXAxis: false,
              showYAxis: false,
              prefix: widget.prefix,
              suffix: widget.suffix,
              units: widget.units,
              displayRoundedData: widget.displayRoundedData,
              isHighContrastMode: window.localStorage.getItem('high_contrast_mode')
            };
            let chartWidget = new ChartWidget(options);
            // self.charts.push(chartWidget);
          }
          break;

        // case 'kpi-sparkline':
        //   break;
        //
        // case 'sparkline':
        //   break;

        default:
          console.error('No chart type for widget type:', w.type);
      }
    });
    return this;
  }

}

export default LegacyDashboardShow;
