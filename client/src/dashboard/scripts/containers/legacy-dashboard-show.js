import { select, selectAll } from 'd3-selection';

import { getDatasetsByWidgetId } from './../reducers/datasets';

import FactWidget from './../legacy-components/Widgets/FactWidget';
import ChartWidget from './../legacy-components/Widgets/ChartWidget';
import convertDataForPie from './../legacy-components/Helpers/convertDataForPie'
import convertDataForLine from './../legacy-components/Helpers/convertDataForLine'
import stackByPercentage from './../legacy-components/Helpers/stackByPercentage';


const C_HEIGHT = 150;

class LegacyDashboardShow {

  // charts: [];

  constructor(store) {
  }

  render(props) {
    let self = this;
    let chartData = null;
    let sparkline;
    self.props = props;

    self.props.widgets.forEach((w) => {
      let el = selectAll(`[data-id="${w.id}"] .widget__inner`);
      let datasets = getDatasetsByWidgetId(self.props.datasets, w.id);

      switch (w.type) {

        case 'line':
          el.each(function() {
            chartData = convertDataForLine(datasets);
            let options = {
              data: chartData,
              height: C_HEIGHT,
              element: el,
              type: w.type,
              margin: {top: 20, right: 5, bottom: 20, left: 40},
              showLegend: true,
              showNullData: true,
              showOverlay: true,
              showXAxis: true,
              showYAxis: true,
              prefix: w.prefix,
              suffix: w.suffix,
              units: w.units,
              padding: {
                left: 20,
                right: 20,
                top: 0,
                bottom: 0
              },
              displayRoundedData: w.displayRoundedData,
              isHighContrastMode: window.localStorage.getItem('high_contrast_mode') === 'on'
            };

            let chartWidget = new ChartWidget(options);
            // self.charts.push(chartWidget);
          });

        case 'bar':
          el.each(function() {
            chartData = convertDataForLine(datasets);
            let options = {
              data: chartData,
              legendData: chartData,
              height: C_HEIGHT,
              element: el,
              type: w.type,
              margin: {top: 20, right: 5, bottom: 20, left: 40},
              showLegend: true,
              showNullData: true,
              showOverlay: true,
              showXAxis: true,
              showYAxis: true,
              prefix: w.prefix,
              suffix: w.suffix,
              units: w.units,
              stacking: w.stacking,
              displayRoundedData: w.displayRoundedData,
              isHighContrastMode: window.localStorage.getItem('high_contrast_mode') === 'on'
            };

            if(w.stacking && w.stacking === 'percentage'){
              options.chartData = stackByPercentage(chartData);
            }
            let chartWidget = new ChartWidget(options);
            // self.charts.push(chartWidget);
          });
          break;

        case 'fact':
          el.each(function() {
            new FactWidget({
              description: w.description,
              element: el
            });
          });
          break;

        case 'pie':
          el.each(function() {
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
                isHighContrastMode: window.localStorage.getItem('high_contrast_mode') === 'on'
              };
              let chartWidget = new ChartWidget(options);
              // self.charts.push(chartWidget);
            }
          });
          break;

        case 'sparkline':
          chartData = convertData(datasets);
          el.each(function() {
            chartData = convertData(datasets);
            let options = {
              element: el,
              data: chartData,
              prefix: w.prefix,
              suffix: w.suffix,
              units: w.units,
              displayRoundedData: w.displayRoundedData,
              isHighContrastMode: window.localStorage.getItem('high_contrast_mode') === 'on'
            };

            sparkline = new SparklineWidget(options);
            // self.charts.push(sparkline);
          });
          break;

      }
    });
    return this;
  }

}

export default LegacyDashboardShow;
