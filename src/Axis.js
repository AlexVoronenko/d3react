import * as d3 from "d3";

function Axis() {
  const data = [
    { x: 16, y: 2 },
    { x: 36, y: 4 },
    { x: 45, y: -1 },
  ];

  const aspectRatio = 1;
  const canvasHeight = 600;
  const canvasWidth = canvasHeight * aspectRatio;
  const margin = { top: 10, right: 20, bottom: 30, left: 20 };
  const height = canvasHeight - margin.top - margin.bottom;
  const width = canvasWidth - margin.left - margin.right;

  const svg = d3
    .select(".canvas")
    .append("svg")
    .attr("width", canvasWidth)
    .attr("height", canvasHeight)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear().domain([0, width]).range([0, width]);
  const y = d3.scaleLinear().domain([height, 0]).range([height, 0]);

  const xAxis = d3.axisBottom(x).ticks(10).tickSize(-height).tickPadding(10);
  const yAxis = d3.axisRight(x).ticks(10).tickSize(width).tickPadding(-10);

  // const xAxisElement = svg.append("g").attr("class", "axis x-axis").call(xAxis);
  // const yAxisElement = svg.append("g").attr("class", "axis y-axis").call(yAxis);

  svg.append("g").attr("transform", `translate(0,${height})`).call(xAxis);
  svg.append("g").call(yAxis);

  svg.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x).ticks(10));
  svg.append("g").call(d3.axisLeft(y).ticks(10));

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
      .attr("r", "3")
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
