import * as d3 from "d3";
import ReactFauxDOM from "react-faux-dom";

function ToolTips(props) {
  let data = props.toolTipData;
  console.log("props.valueToolTips", data);
  const canvasHeight = 400;
  const canvasWidth = 400;
  const margin = { top: 10, right: 20, bottom: 30, left: 20 };
  const height = canvasHeight - margin.top - margin.bottom;
  const width = canvasWidth - margin.left - margin.right;

  let scaleSvg = height / 50 / 2;
  let translateX = width / 2;
  let translateY = height / 2;

  const fauxAxis = new ReactFauxDOM.Element("div", ".toolTip");
  const svgToolTips = d3
    .select(fauxAxis)
    // .attr("id", "tooltip")
    .append("svg")
    .attr("width", canvasWidth)
    .attr("height", canvasHeight)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  svgToolTips
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

  return (
    <>
      <h1>ToolTips</h1>
      <div className="toolTipCanvas"></div>

      <div>{fauxAxis.toReact()}</div>
    </>
  );
}

export default ToolTips;
