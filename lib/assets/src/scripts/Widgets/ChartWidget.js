import d3 from 'd3';
//import BenchMark from 'Charts/BenchMark.js';
import Legend from 'd3-charts-dto/lib/javascripts/Charts/Legend.js';
import LineChart from 'd3-charts-dto/lib/javascripts/Charts/LineChart.js';
import StackBarChart from 'd3-charts-dto/lib/javascripts/Charts/StackBarChart.js';
import PieChart from 'd3-charts-dto/lib/javascripts/Charts/PieChart.js';

import NullDataLayer from 'd3-charts-dto/lib/javascripts/Charts/NullDataLayer.js';
import OverlayLayer from 'd3-charts-dto/lib/javascripts/Charts/OverlayLayer.js';
import XAxis from 'd3-charts-dto/lib/javascripts/Charts/XAxis';
import YAxis from 'd3-charts-dto/lib/javascripts/Charts/YAxis';

import debounceD3Event from './../utilities/debounce-d3-event';
import { handleGaEvent } from './../services/google-analytics';
var track = require('./../constants/tracking');


const MIN_ENGAGED_TIME = 2000;

class ChartWidget {

  constructor(options) {
    this.props = {
      trackedClickEngagement: false,
      trackedHoverEngagement: false,
      hoverEngagementTimer: null,
      isHoverEngaged: false,
      elBounds: null
    };
    this.options = options;
    this.margin = options.margin;
    this.data = options.data;
    this.element = options.element;
    this.chart = null;
    this.legend = null;
    this.xAxis = null;
    this.yAxis = null;
    this.overlay = null;
    this.nullData = null;
    if (!this.data || !this.data.length) return;
    this.init();
  }

  switchColorMode(isHighContrastMode){
    this.chart.switchColorMode(isHighContrastMode);
    this.legend.updateLegendIcon();
  }

  init(){
    switch (this.options.type) {
    case 'line':
      this.chart = new LineChart(this.options);
      break;
    case 'bar':
      this.chart = new StackBarChart(this.options);
      break;
    case 'pie':
      this.chart = new PieChart(this.options);
      break;
    default:
      return false;
    }
    if (this.chart) {
      this.chart.init();
      if (this.options.showNullData === true) {
        this.nullData = new NullDataLayer({chart: this.chart, above: false });
      }
      if (this.options.showXAxis === true) {
        this.xAxis = new XAxis({chart: this.chart});
      }
      if (this.options.showYAxis === true) {
        this.yAxis = new YAxis({chart: this.chart});
      }
      if (this.options.showLegend === true) {
        this.legend = new Legend({chart: this.chart});
      }
      if (this.options.showOverlay === true) {
        this.overlay = new OverlayLayer({chart: this.chart, legend: this.legend, above: true});
      }
    }

    this.props.elBounds = this.element[0][0].getBoundingClientRect();  // {top: 199.5625, right: 516, bottom: 349.5625, left: 15, width: 501…}

    this.bindEvents();
    return this;
  }

  bindEvents() {
    this.element.on('click', debounceD3Event(this.onClick.bind(this)));
    this.element.on('mouseover', debounceD3Event(this.onHover.bind(this), 200));
    this.element.on("mouseout", this.resetEngagement.bind(this));
    return this;
  }

  onClick() {
    if (!this.props.trackedClickEngagement) {
      handleGaEvent(...track.ENGAGED_WITH_CHART, track.LABEL_BELOW_THE_LINE_CHART);
      this.props.trackedClickEngagement = true;
    }
  }

  onHover() {
    let self = this;
    if (this.props.trackedHoverEngagement) {
      return;
    }
    if (!self.props.hoverEngagementTimer) {
      self.props.hoverEngagementTimer = setTimeout(function() {
        if (!self.props.isHoverEngaged) {
          handleGaEvent(...track.ENGAGED_WITH_CHART, track.LABEL_BELOW_THE_LINE_CHART);
          self.props.isHoverEngaged = true;
        }
      }, MIN_ENGAGED_TIME);
      this.props.trackedHoverEngagement = true;
    }
  }

  resetEngagement() {
    if (!this.props.hoverEngagementTimer && this.props.trackedHoverEngagement) {
      return;
    }
    let e = d3.event;
    var mousePos = {'x': e.layerX, 'y': e.layerY};
    if (!(  // if i leave the element perim
        (mousePos.x >= this.props.elBounds.left && mousePos.x <= this.props.elBounds.right) ||
        (mousePos.y >= this.props.elBounds.top && mousePos.y <= this.props.elBounds.bottom)
    )) {
      clearTimeout(this.props.hoverEngagementTimer);
      this.props.hoverEngagementTimer = null;
    }
  }

}


module.exports = ChartWidget;
