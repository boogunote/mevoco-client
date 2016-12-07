import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';

import { apiCall } from 'utils/remoteCall';
import { firstItem } from 'utils/helpers';

import { selectWindow } from 'containers/App/selectors';
import { selectDbVm } from 'containers/App/selectors';

import appStyles from 'containers/App/styles.css';

import { FormattedMessage } from 'react-intl';

import * as d3 from 'd3';

class ProgressArc extends Component {
  componentDidMount() {
    const context = this.setContext();
    this.setBackground(context);
  }
  setContext() {
    // return d3.select(this.refs.arc).append('svg')
    //   .attr('height', '300px')
    //   .attr('width', '300px')
    //   .attr('id', 'd3-arc')
    //   .append('g')
    //   .attr('transform', `translate(150, 150)`);

    var tooltip = d3.select(this.refs.arc)
      .append("div")
      .style("position", "relative")
      .style("z-index", "1000")
      .style("visibility", "hidden")
      .text("a simple tooltip");
      
    var svg = d3.select(this.refs.arc).append('svg')
      .attr("class", "sample")
      .attr("width", 300)
      .attr("height", 300);    
      
    svg.append("svg:circle")
      .attr("stroke", "black")
      .attr("fill", "aliceblue")
      .attr("r", 50)
      .attr("cx", 52)
      .attr("cy", 52)
      .on("mouseover", function(){return tooltip.style("visibility", "visible");})
      .on("mousemove", function(){
        console.log(d3.event)
        // return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
        return tooltip.style("top", d3.event.offsetY+"px").style("left", d3.event.offsetX+"px");})
      .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

    return svg;
  }
  setBackground(context) {
    // return context.append('path')
    // .datum({ endAngle: this.tau })
    // .style('fill', '#e6e6e6')
    // .attr('d', this.arc());
  }
  tau = Math.PI * 2;
  arc() {
    return d3.arc()
      .innerRadius(100)
      .outerRadius(110)
      .startAngle(0)
  }

  render() {
    return (
      <div ref="arc"></div>
    )
  }
}

let VmInstanceMonitor = React.createClass({

  render: function() {
    // let data = this.props.dbVm[this.props.dataUuid];
    // if (!data) return null;
    return (
      <div>
        <ProgressArc />
      </div>
    )
  }
});

function mapDispatchToProps(dispatch) {
  return {};
}

const mapStateToProps = createStructuredSelector({
  dbVm: selectDbVm(),
  globalWindow: selectWindow()
});


export default connect(mapStateToProps, mapDispatchToProps)(VmInstanceMonitor);