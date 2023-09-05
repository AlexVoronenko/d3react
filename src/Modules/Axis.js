import * as d3 from "d3";
import "./css/axisCss.css";

function Axis(props) {
  let data = props.axisData;
  console.log("props.axisData", data);
  const aspectRatio = 1920 / 1080;
  const canvasHeight = 600;
  const canvasWidth = canvasHeight * aspectRatio;
  const margin = { top: 10, right: 20, bottom: 30, left: 20 };
  const height = canvasHeight - margin.top - margin.bottom;
  const width = canvasWidth - margin.left - margin.right;

  let scaleSvg = height / 50 / 2;
  let domainSize = height / (2 * scaleSvg);

  const x = d3.scaleLinear().range([0, width]);
  x.domain([-domainSize, domainSize]);
  const y = d3.scaleLinear().range([0, height]);
  y.domain([-domainSize / aspectRatio, domainSize / aspectRatio]);

  // let scaleSvg = height / 2;
  let translateX = width / 2;
  let translateY = height / 2;

  const svg = d3
    .select(".canvas")
    .attr("class", "classAxis")
    .append("svg")
    .attr("width", canvasWidth)
    .attr("height", canvasHeight)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const ticksCount = 16;
  const xAxis = d3.axisBottom(x).ticks(ticksCount).tickSize(-height).tickPadding(10);
  const yAxis = d3
    .axisLeft(y)
    .ticks(ticksCount / aspectRatio)
    .tickSize(-width)
    .tickPadding(5);

  svg
    .append("g")
    .attr("class", "axis x-axis")
    .attr("transform", `translate(0,${height})`)
    .style("stroke-opacity", "0.1")
    // .attr("stroke", "black")
    .call(xAxis);

  svg
    .append("g")
    .attr("class", "axis y-axis")
    .attr("transform", `translate(0,0)`)
    .style("stroke-opacity", "0.1")
    // .attr("stroke", "black")
    .call(yAxis);

  // const y0AxisElement =
  svg
    .append("line")
    .classed("grid-line", true)
    .attr("class", "axis x-axis")
    .style("stroke-opacity", "0.5")
    .attr("x1", width / 2)
    .attr("y1", 0)
    .attr("x2", width / 2)
    .attr("y2", height)
    .attr("stroke", "black");

  // const x0AxisElement =
  svg
    .append("line")
    .classed("grid-line", true)
    .attr("class", "axis x-axis")
    .style("stroke-opacity", "0.5")
    .attr("x1", 0)
    .attr("y1", height / 2)
    .attr("x2", width)
    .attr("y2", height / 2)
    .attr("stroke", "black");

  draw();
  function draw() {
    svg
      .selectAll(".points")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "circle")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", 4 / scaleSvg)
      .attr("stroke", "black")
      .attr("fill", "none")
      .attr("stroke-width", 1)
      .attr("transform", ` translate(${translateX},${translateY}) scale(${scaleSvg},-${scaleSvg})`)
      .style("stroke", "blue");

    console.log(data);
  }

  return (
    <>
      <h1>Axis component</h1>
      <div className="canvas"></div>
    </>
  );
}

export default Axis;
