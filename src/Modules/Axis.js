import React from "react";
import { useRef, useEffect, useState } from "react";
import { select, scaleLinear, axisBottom, axisLeft, zoom } from "d3";
// import "./css/axisCss.css";

function Axis(props) {
  const svgRef = useRef();

  const [currentZoomState, setCurrentZoomState] = useState();
  // let data = props.axisData;
  // if (data === "") return;
  // console.log("props.axisData", data);

  useEffect(() => {
    const aRatio = 1920 / 1080;
    const canvasHeight = 300;
    const canvasWidth = canvasHeight * aRatio;
    const margin = { top: 10, right: 20, bottom: 30, left: 30 };
    const height = canvasHeight - margin.top - margin.bottom;
    const width = canvasWidth - margin.left - margin.right;

    let scaleSvg = height / 50 / 2;
    let domainSize = height / (2 * scaleSvg);

    const svg = select(svgRef.current);
    // const xScale = scaleLinear().range([10, 300]).domain([-100, 100]);
    const xScale = scaleLinear()
      .domain([0, 200])
      .range([10, width - 10]);
    const yScale = scaleLinear().range([0, height]).domain([-40, 40]);

    if (currentZoomState) {
      const newXScale = currentZoomState.rescaleX(xScale);
      const newYScale = currentZoomState.rescaleY(yScale);
      console.log(xScale.domain());
      console.log(newXScale.domain());
      console.log(yScale.domain());
      console.log(newYScale.domain());
      xScale.domain(newXScale.domain());
      yScale.domain(newYScale.domain());
    }

    // let scaleSvg = height / 2;
    let translateX = width / 2;
    let translateY = height / 2;

    svg
      .attr("width", canvasWidth)
      .attr("height", canvasHeight)
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const ticksCount = 10;
    // const xAxis = axisBottom(xScale);
    // .ticks(ticksCount).tickSize(-height).tickPadding(10);
    const yAxis = axisLeft(yScale);
    // .ticks(ticksCount / aRatio)
    // .tickSize(-width)
    // .tickPadding(5);

    const xAxis = axisBottom(xScale);
    svg.select(".x-axis").attr("transform", `translate(0, ${height})`).call(xAxis);

    // svg
    //   .select(".x-axis")
    //   .attr("transform", `translate(${margin.left},${height})`)
    //   .style("stroke-opacity", "0.1")
    //   // .attr("stroke", "black")
    //   .call(xAxis);

    svg
      .select(".y-axis")
      .attr("transform", `translate(${margin.left},0)`)
      .style("stroke-opacity", "0.1")
      // .attr("stroke", "black")
      .call(yAxis);

    const zoomBehavior = zoom()
      .scaleExtent([0.5, 5])
      .translateExtent([
        [0, 0],
        [width, height],
      ])
      .on("zoom", (event) => {
        const zoomState = event.transform;
        setCurrentZoomState(zoomState);
        console.log(zoomState);
      });
    svg.call(zoomBehavior);
  }, [currentZoomState]);

  // // const y0AxisElement =
  // svg
  //   .append("line")
  //   .classed("grid-line", true)
  //   .attr("class", "axis x-axis")
  //   .style("stroke-opacity", "0.5")
  //   .attr("x1", width / 2)
  //   .attr("y1", 0)
  //   .attr("x2", width / 2)
  //   .attr("y2", height)
  //   .attr("stroke", "black");

  // // const x0AxisElement =
  // svg
  //   .append("line")
  //   .classed("grid-line", true)
  //   .attr("class", "axis x-axis")
  //   .style("stroke-opacity", "0.5")
  //   .attr("x1", 0)
  //   .attr("y1", height / 2)
  //   .attr("x2", width)
  //   .attr("y2", height / 2)
  //   .attr("stroke", "black");

  draw();
  function draw() {
    // svg
    //   .selectAll(".points")
    //   .data(data)
    //   .enter()
    //   .append("circle")
    //   .attr("class", "circle")
    //   .attr("cx", (d) => d.x)
    //   .attr("cy", (d) => d.y)
    //   .attr("r", 4 / scaleSvg)
    //   .attr("stroke", "black")
    //   .attr("fill", "none")
    //   .attr("stroke-width", 1)
    //   .attr("transform", ` translate(${translateX},${translateY}) scale(${scaleSvg},-${scaleSvg})`)
    //   .style("stroke", "blue");
    // console.log(data);
  }

  return (
    <React.Fragment>
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
        <g className="x-axis0" />
        <g className="y-axis0" />
        <path d="M0,150 100,100,150,120" stroke="blue" fill="none"></path>
      </svg>
    </React.Fragment>

    // <>
    //   <h1>Axis component</h1>
    //   <div className="canvas"></div>
    // </>
  );
}

export default Axis;
