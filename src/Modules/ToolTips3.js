import * as d3 from "d3";
import ReactFauxDOM from "react-faux-dom";
// import Tippy from "@tippyjs/react";
// import "./css/tooltip.css";
// import tippy from "tippy.js";
// import { hover, tipcontent } from "@fil/hello-tippy";

function ToolTips3(props) {
  let data = props.toolTipData;
  if (data === "") return;
  console.log("props.valueToolTips", data);
  const canvasHeight = 400;
  const canvasWidth = 400;
  const margin = { top: 10, right: 20, bottom: 30, left: 20 };
  const height = canvasHeight - margin.top - margin.bottom;
  const width = canvasWidth - margin.left - margin.right;

  let scaleSvg = height / 50 / 2;
  let translateX = width / 2;
  let translateY = height / 2;

  // const tooltip1 = document.querySelector(".toolTipCanvas");
  // .append("text")
  // .attr("class", "tooltip")
  // .attr("fill", "black")
  // .style("pointer-events", "none");
  const fauxAxis3 = new ReactFauxDOM.Element("div", ".toolTip3");
  var Tooltip = d3
    .select(fauxAxis3)
    // .attr("id", "tooltip")
    .append("svg")
    .attr("width", canvasWidth)
    .attr("height", canvasHeight)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  Tooltip.selectAll(".points")
    .data(data)
    .enter()
    .append("circle")
    // .attr("class", `tippy1`)
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", 4 / scaleSvg)
    .attr("stroke", "black")
    .attr("fill", "none")
    .attr("stroke-width", 1)
    .attr("transform", ` translate(${translateX},${translateY}) scale(${scaleSvg},-${scaleSvg})`)
    .style("stroke", "blue")
    .on("mouseover", (evt, d) => {
      const [mx, my] = d3.pointer(evt);
      const tooltip1 = document.querySelector(".toolTipCanvas");
      // tooltip1.attr("x", mx).attr("y", my).text(`a ${d.x}: ${d.y}`);
    })
    .on("mouseout", () => {
      const tooltip1 = document.querySelector(".toolTipCanvas");
      // clear the tooltip
      // tooltip1.text("");
    });
  return (
    <>
      <h1>ToolTips3</h1>
      <div className="toolTipCanvas"></div>
      <div className="tooltip3"></div>
      <div>{fauxAxis3.toReact()}</div>
    </>
  );
}

export default ToolTips3;
