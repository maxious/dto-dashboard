'use strict';

import d3 from 'd3';
import getDate from 'Helpers/getDate';

/*
* Define Bar graph tooltip
*/

let AnnotationTooltip = function(_annotations, _ele) {
  this.annotations = _annotations;
  this.element = _ele;
  this.defaultData = this.annotations.data[0];
  this.updateTooltip(this.defaultData);
  this.render();
};

AnnotationTooltip.prototype.render = function() {
  let that = this;
  this.annotations.chart.svg.selectAll('.annotation')
      .on('mouseover', function(d) {
        d3.select(this)
          .transition()
          .attr('r', 10);
        that.updateTooltip(d);
      })
      .on('mouseout', function() {
        d3.select(this)
          .transition()
          .attr('r', 7);
      });
};

AnnotationTooltip.prototype.updateTooltip = function(d) {
  const html = `<div class='fancy-tooltip'><span class='title'>${getDate().long(d.label)}</span><span class='annotation'>${d.annotation}</span></div>`;
  this.element.html(html);
};

module.exports = AnnotationTooltip;
