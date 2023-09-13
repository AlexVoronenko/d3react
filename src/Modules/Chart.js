import * as d3 from "d3";
import { withFauxDOM } from "react-faux-dom";
import React from "react";

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.renderD3 = this.renderD3.bind(this);
    this.updateD3 = this.updateD3.bind(this);
  }
  componentDidMount() {
    this.renderD3();
  }
  componentDidUpdate(prevProps, prevState) {
    //не сравнивай props.chart, т.к. он обновляется в updateD3()
    if (this.props.data !== prevProps.data) {
      this.updateD3();
    }
  }
  render() {
    return <div>{this.props.chart}</div>;
  }

  renderD3() {
    let data = this.props.data;
    let faux = this.props.connectFauxDOM("div", "chart");

    let svgDoc = d3.select(faux).append("svg");
    svgDoc.append("text").attr("x", 50).attr("y", 50).text("text");
  }

  updateD3() {
    let data = this.props.data;

    // reattach to faux dom
    let faux = this.props.connectFauxDOM("div", "chart");
    let svgDoc = d3.select(faux).select("svg");

    // rejoin data
    let circle = svgDoc.select("g").selectAll("circle").data(data);
    circle.exit().remove(); // remove unneeded circles

    // create any new circles needed
    const newCircles = circle.enter().append("circle").attr("cy", 50).attr("cx", 50).attr("r", 0);

    // update all circles to new positions
    newCircles
      .merge(circle)
      .transition()
      .duration(500)
      .attr("cx", 1)
      .attr("r", function (d, i) {
        return d;
      });

    this.props.animateFauxDOM(800);

    d3.select("text").text(this.props.title);
  }
}

const FauxChart = withFauxDOM(Chart);

export default FauxChart;
