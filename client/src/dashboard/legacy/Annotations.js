'use strict';

import d3 from 'd3';
import _ from 'lodash';

/*
* Define Annotation
*/
let numberOfInstance = 0;

const Annotations = function(_chart) {
  const that = this;
  this.chart = _chart;
  this.data = this.chart.rawData.annotations.map((d)=>(
    {
      label: d3.time.format('%Y-%m').parse(d.label),
      value: this.getValue(this.chart.data, d),
      annotation: d.value
    }
  ));
  numberOfInstance ++;
  this.render();
  d3.select(window).on('resize.' + 'annotation' + numberOfInstance, that.update.bind(that));
};

Annotations.prototype.render = function() {
  const that = this;
  const wrapper = this.chart.svg.append('g')
                      .attr('class', `annotations annotations--${that.chart.rawData.id}`)
                      .attr('transform', 'translate(' + this.chart.margin.left + ',' + this.chart.margin.top + ')');

  wrapper.selectAll('circle')
         .data(this.data)
         .enter().append('circle')
         .attr('class', 'annotation')
         .attr('cx', d => that.chart.x(d.label))
         .attr('cy', d => that.chart.y(d.value))
         .attr('r', 0)
         .attr('stroke-width', 0)
         .transition()
         .attr('r', 7)
         .attr('stroke-width', 3)
         .delay(function(d, i) {
           return i * 20;
         })
         .duration(1000)
         .ease('elastic');

};

Annotations.prototype.getValue = function(data, d) {
  const value = _.find(data, (_d) => _d.label.getTime() === d3.time.format('%Y-%m').parse(d.label).getTime()).value;
  return value;
};

Annotations.prototype.update = function() {
  const that = this;
  this.chart.svg.select('.annotations')
               .selectAll('circle')
               .attr('cx', d => that.chart.x(d.label))
               .attr('cy', d => that.chart.y(d.value));
};

module.exports = Annotations;
