import 'babel-polyfill';
import 'autotrack/lib/plugins/event-tracker';
import 'autotrack/lib/plugins/outbound-link-tracker';

let $ = window.jQuery || {};
import d3 from 'd3';
import * as config from './constants/config';
import { handleGaEvent } from './services/google-analytics';
// import ChartWidget from './Widgets/ChartWidget';
import convertData from './Helpers/convertData';
import convertDataForHero from './Helpers/convertDataForHero';
// import convertDataForPie from './Helpers/convertDataForPie';
// import convertDataForLine from './Helpers/convertDataForLine';
import createPatterns from './Helpers/createPatterns';
// import FactWidget from './Widgets/FactWidget';
import HeroWidget from './Widgets/HeroWidget';
import SparklineWidget from './Widgets/SparklineWidget';
// import stackByPercentage from './Helpers/stackByPercentage';
import Note from './Note';
var track = require('./constants/tracking');


const DASHBOARDS_INDEX_ROUTE = 'dashboards_index';
const DASHBOARDS_SHOW_ROUTE = 'dashboards_show';

const getRoute = () => {
  return document.body.getAttribute('data-route');
};

let currentRoute = getRoute();


let charts = [];
// const cHeight = 150;
let localStorage = window.localStorage;
let isHighContrastMode = "off";
let modeButton = d3.select('#switch-mode');
let $modeButton = $('#switch-mode');

let heroHeight = config.DEFAULT_HERO_HEIGHT;

if ((window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) <= config.SCREEN_SM){
  heroHeight = cHeight;
}

let patterns = createPatterns();
let patternsDark = createPatterns({darken:true});
window.patterns = patterns;
window.patternsDark = patternsDark;

if (document.location.hostname === 'localhost') {
  d3.select('body').classed('debug-mode', true);
}

// d3.selectAll('.line .widget__inner').each(function() {
//   let widget = JSON.parse(this.getAttribute('data-data'));
//   let dataRaw = widget.datasets;
//   let chartData = convertDataForLine(dataRaw);
//
//   let options = {
//     data: chartData,
//     height: cHeight,
//     element: d3.select(this),
//     type: widget.type,
//     margin: {top: 20, right: 5, bottom: 20, left: 40},
//     showLegend: true,
//     showNullData: true,
//     showOverlay: true,
//     showXAxis: true,
//     showYAxis: true,
//     prefix: widget.prefix,
//     suffix: widget.suffix,
//     units: widget.units,
//     padding: {
//       left: 20,
//       right: 20,
//       top: 0,
//       bottom: 0
//     },
//     displayRoundedData: widget.displayRoundedData,
//     isHighContrastMode: isHighContrastMode
//   };
//
//
//   let chartWidget = new ChartWidget(options);
//   charts.push(chartWidget);
// });
//
// d3.selectAll('.bar .widget__inner').each(function() {
//   let widget = JSON.parse(this.getAttribute('data-data'));
//   let dataRaw = widget.datasets;
//   let chartData = convertDataForLine(dataRaw);
//
//   let options = {
//     data: chartData,
//     legendData: chartData,
//     height: cHeight,
//     element: d3.select(this),
//     type: widget.type,
//     margin: {top: 20, right: 5, bottom: 20, left: 40},
//     showLegend: true,
//     showNullData: true,
//     showOverlay: true,
//     showXAxis: true,
//     showYAxis: true,
//     prefix: widget.prefix,
//     suffix: widget.suffix,
//     units: widget.units,
//     stacking: widget.stacking,
//     displayRoundedData: widget.displayRoundedData,
//     isHighContrastMode: isHighContrastMode
//   };
//
//   if(widget.stacking === 'percentage'){
//     options.chartData = stackByPercentage(chartData);
//   }
//
//   let chartWidget = new ChartWidget(options);
//   charts.push(chartWidget);
// });

// d3.selectAll('.pie .widget__inner').each(function() {
//   let widget = JSON.parse(this.getAttribute('data-data'));
//   let chartData = convertDataForPie(widget.datasets);
//   if (chartData) {
//     let options = {
//       data: chartData,
//       height: cHeight,
//       element: d3.select(this),
//       type: widget.type,
//       margin: {top: 0, right: 0, bottom: 0, left: 0},
//       showLegend: true,
//       showNullData: false,
//       showOverlay: false,
//       showXAxis: false,
//       showYAxis: false,
//       prefix: widget.prefix,
//       suffix: widget.suffix,
//       units: widget.units,
//       displayRoundedData: widget.displayRoundedData,
//       isHighContrastMode: isHighContrastMode
//     };
//     let chartWidget = new ChartWidget(options);
//     charts.push(chartWidget);
//   }
// });

// d3.selectAll('.fact .widget__inner').each(function() {
//   let widget = JSON.parse(this.getAttribute('data-data'));
//   new FactWidget({
//     description: widget.description,
//     element: d3.select(this)
//   });
// });


// d3.selectAll('.sparkline .widget__inner').each(function() {
//   let widget = JSON.parse(this.getAttribute('data-data'));
//   let data = null;
//
//   if(widget.datasets[0].data){
//     data = convertData(widget.datasets);
//   }
//
//   let sparkline = new SparklineWidget({
//     element: d3.select(this),
//     data: data,
//     prefix: widget.prefix,
//     suffix: widget.suffix,
//     units: widget.units,
//     displayRoundedData: widget.displayRoundedData,
//     isHighContrastMode: isHighContrastMode
//   });
//   charts.push(sparkline);
// });

if (currentRoute === DASHBOARDS_SHOW_ROUTE) {

  let sparklines = [];
  d3.selectAll('.kpi-sparkline .widget__inner').each(function() {
    let widget = JSON.parse(this.getAttribute('data-data'));
    let data = null;
    if (widget.datasets[0].data){
      data = convertData(widget.datasets);
    }

    let sparkline = new SparklineWidget({
      element: d3.select(this),
      data: data,
      prefix: widget.prefix,
      suffix: widget.suffix,
      units: widget.units,
      displayRoundedData: widget.displayRoundedData,
      isHighContrastMode: isHighContrastMode
    });
    sparklines.push(sparkline);
    charts.push(sparkline);
  });


  d3.selectAll('.hero').each(function() {
    let chartData = convertDataForHero(JSON.parse(this.getAttribute('data-data')));

    if(chartData.length){
      // init widget
      let heroWidget = new HeroWidget({
        element: d3.select(this),
        data: chartData,
        margin: {top: 0, right: 0, bottom: 0, left: 0},
        sparklines: sparklines,
        height: heroHeight,
        isHighContrastMode: isHighContrastMode
      });
      charts.push(heroWidget);
    }
  });


  d3.selectAll('.widget__definition').each(function(){
    new Note({
      title: d3.select(this).select('.widget__definition--title'),
      content: d3.select(this).select('.widget__definition--content'),
      note: d3.select(this)
    });
  });


// TO BE REMOVED WHEN WE REMOVE HIGH CONTRAST MODE
  const iconSize = 14;

  let kpiColors = {
    'user-satisfaction': '#f2b038',
    'cost-per-transaction': '#75a370',
    'digital-take-up': '#4892c0',
    'completion-rate': '#7066a5'
  };

  let kpiLineStyles = {
    'user-satisfaction': '12, 5',
    'cost-per-transaction': '10, 5',
    'digital-take-up': '3, 3',
    'completion-rate': '5, 10'
  }

// manually add svgs for kpi titles
  d3.selectAll('.dashboard__kpis .widget__title').each(function(){
    let id = d3.select(this).attr('id');
    d3.select(this)
      .insert("svg", ":first-child")
      .attr('height', iconSize)
      .attr('width', iconSize)
      .append('line')
      .attr('x1', 0)
      .attr('x2', iconSize)
      .attr('y1', iconSize / 2)
      .attr('y2', iconSize / 2)
      .attr('stroke', kpiColors[id])
      .attr('stroke-width', 3)
      .attr('stroke-dasharray', kpiLineStyles[id])
  });
}



/**
 * Tell GA when I scrolled to the bottom of any page.
 * todo - make this less gross
 */
let hasReachedBottomOnce = false;
window.addEventListener('scroll', function() {
  let wHeight = window.innerHeight;
  let pageHeight = document.body.clientHeight;
  let yPos = wHeight + (this.pageYOffset || document.body.scrollTop);

  if (!hasReachedBottomOnce) {
    if (yPos === pageHeight) {
      handleGaEvent(track.SCROLLED_TO_BOTTOM);
      hasReachedBottomOnce = true;
    }
  }
});



// must exist after **global** charts is created :(
// todo - refactor - everything below here !


function toggleHighContrastMode(value) {
  if (value === "on") {
    isHighContrastMode = true;
  } else if (value === "off") {
    isHighContrastMode = false;
  } else {
    isHighContrastMode = !isHighContrastMode;
  }
  handleGaEvent(isHighContrastMode ? track.ENABLE_HIGH_CONTRAST : track.DISABLE_HIGH_CONTRAST);
  // switch to high contrast mode
  d3.select('body').classed('is-high-contrast', isHighContrastMode);
  modeButton.classed('is-high-contrast', isHighContrastMode);

  charts.forEach((c) => {
    c.switchColorMode(isHighContrastMode);
  });
  if (localStorage) {
    localStorage.setItem('high_contrast_mode', isHighContrastMode ? "on" : "off");
  }
}

if (localStorage) {
  let storedHighContrastMode = localStorage.getItem('high_contrast_mode');
  if (storedHighContrastMode === "on") {  // localStorage sets Boolean as String
    // must jquery trigger to trick the css checkbox to "switch" - :(
    $modeButton.trigger('click');
    // programmatically trigger the application values
    toggleHighContrastMode.call(this, "on")
  } else {
    // programmatically trigger the application values
    toggleHighContrastMode.call(this, "off");
  }
}

modeButton.on('click', toggleHighContrastMode);
