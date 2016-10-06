import d3 from 'd3';
import _ from 'lodash';

//import BenchMark from 'Charts/BenchMark.js';
import LineChart from 'd3-charts-dto/lib/javascripts/Charts/LineChart.js';
import NullDataLayer from 'd3-charts-dto/lib/javascripts/Charts/NullDataLayer.js';
import OverlayLayer from 'd3-charts-dto/lib/javascripts/Charts/OverlayLayer.js';
import getDate from 'd3-charts-dto/lib/javascripts/Helpers/getDate.js';
import debounceD3Event from './../utilities/debounce-d3-event';
import { handleGaEvent } from './../services/google-analytics';
var track = require('./../constants/tracking');


// used for GA engagement tracking
const MIN_ENGAGED_COUNT = 3;


class HeroWidget {

  constructor(options) {
    this.props = {
      engagementCount: 0
    };

    this.options = options;
    this.margin = options.margin;
    this.data = options.data;
    this.sparklines = options.sparklines;
    this.chart = null;
    this.overlay = null;
    this.nullData = null;
    if (!this.data || !this.data.length) return;

    this.normaliseDataByMonthOnMonth();
    this.init();
  }

  normaliseDataByMonthOnMonth() {
    let self = this;
    self.data.forEach((d1, idx1) => {
        // if i only have one item set, remove it
        if (d1.length === 1) {
          self.data.splice(idx1, 1);
          return;
        }
        d1.forEach((d2, idx2, arr2) => {
            // if I ever have a sequential month missing kill the whole data set *for now*
            let prev = arr2[idx2 - 1];
            if (prev) {
                let currMonth = d2.x.getMonth();
                let prevMonth = prev.x.getMonth();

                if (currMonth - prevMonth !== 1) {
                  self.data.splice(idx1, 1);
                }
            }
        });
    });
  }

  init() {
    this.chart = new LineChart(this.options);

    if (this.chart) {
      this.chart.init();
      this.nullData = new NullDataLayer({chart: this.chart, above: false });
      this.overlay = new OverlayLayer({
        chart: this.chart,
        legend: null,
        above: true,
        hoverCallback: debounceD3Event(this.hover.bind(this), 200)
      });
      this.chart.svg.selectAll('.ruler-wrapper')
                    .append('text')
                    .text(d=>getDate().long(d.x))
                    .attr('transform', (d, i)=>`translate(${updatePositionFromIndex(i, this.data)}, -5)`);
    }

    this.bindEvents();
    return this;
  }

  bindEvents() {
    let that = this;
    let heroHeight = this.options.height;

    d3.select(window).on('resize.' + 'hero', function(){
      if((window.innerWidth
          || document.documentElement.clientWidth
          || document.body.clientWidth) <= 768){
        heroHeight = 180;
      } else{
        heroHeight = that.options.height;
      }
      if(that.chart.height !== heroHeight){
        that.chart.height = heroHeight;
        that.chart.render();
      }
    });
    return this;
  }

  switchColorMode(isHighContrastMode){
    this.chart.switchColorMode(isHighContrastMode);
  }

  hover(i, data) {
    if (this.props.engagementCount === MIN_ENGAGED_COUNT) {
      handleGaEvent(...track.ENGAGED_WITH_CHART, track.LABEL_HERO_CHART);
    }
    this.props.engagementCount++;

    let activeX = data[0][i].x;
    for (let i = 0; i < this.sparklines.length; i ++){
      let sparkline = this.sparklines[i];

      if (sparkline.data && sparkline.data.length){
        let index = _.findIndex(sparkline.data[0], d=> d.x.getTime() == activeX.getTime());
        sparkline.hover(index);
      }
    }
  }
}

function updatePositionFromIndex(index, data) {
  if(index === 0){
    return 0;
  } else if(index === data[0].length - 1){
    return -70;
  } else {
    return -15;
  }
}

module.exports = HeroWidget;
