import * as d3 from "d3";
import ReactFauxDOM from "react-faux-dom";
import "./css/tooltip.css";

function ToolTips1(props) {
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

  const fauxAxis1 = new ReactFauxDOM.Element("div", ".toolTip");
  const svgToolTips = d3
    .select(fauxAxis1)
    // .attr("id", "tooltip")
    .append("svg")
    .attr("width", canvasWidth)
    .attr("height", canvasHeight)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const tooltipTemplate = document.querySelector(".tooltip1");
  const container = d3.select(tooltipTemplate);

  const tooltipDiv = container.select(".tooltip1");

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
    .style("stroke", "blue")
    .call(tooltip, tooltipDiv);

  function tooltip(selectionGroup, tooltipDiv) {
    // padding between the tooltip and mouse cursor
    const MOUSE_POS_OFFSET = 8;
    selectionGroup.each(() => {
      d3.select(this)
        .on("mouseover.tooltip", handleMouseover)
        .on("mousemove.tooltip3", handleMousemove)
        .on("mouseleave.tooltip", handleMouseleave);
    });
    function handleMouseover() {
      // show/reveal the tooltip, set its contents,
      // style the element being hovered on
      showTooltip();
      setContents(d3.select(this).datum(), tooltipDiv);
      setStyle(d3.select(this));
    }

    function handleMousemove(event) {
      // update the tooltip's position
      const [mouseX, mouseY] = d3.pointer(event, this);
      // add the left & top margin values to account for the SVG g element transform
      setPosition(mouseX + margin.left, mouseY + margin.top);
    }

    function handleMouseleave() {
      // do things like hide the tooltip
      // reset the style of the element being hovered on
      hideTooltip();
      resetStyle(d3.select(this));
    }

    function showTooltip() {
      tooltipDiv.style("display", "block");
    }

    function hideTooltip() {
      tooltipDiv.style("display", "none");
    }

    function setPosition(mouseX, mouseY) {
      tooltipDiv
        .style("top", mouseY < height / 2 ? `${mouseY + MOUSE_POS_OFFSET}px` : "initial")
        .style("right", mouseX > width / 2 ? `${width - mouseX + MOUSE_POS_OFFSET}px` : "initial")
        .style("bottom", mouseY > height / 2 ? `${height - mouseY + MOUSE_POS_OFFSET}px` : "initial")
        .style("left", mouseX < width / 2 ? `${mouseX + MOUSE_POS_OFFSET}px` : "initial");
    }
    function setContents(datum, tooltipDiv) {
      // customize this function to set the tooltip's contents however you see fit
      tooltipDiv
        .selectAll("p")
        .data(Object.entries(datum))
        .join("p")
        .filter(([key, value]) => value !== null && value !== undefined)
        .html(
          ([key, value]) =>
            `<strong>${key}</strong>: ${typeof value === "object" ? value.toLocaleString("en-US") : value}`
        );
    }

    function resetStyle(selection) {
      selection.attr("fill", "#333");
    }
    function setStyle(selection) {
      selection.attr("fill", "magenta");
    }
  }

  return (
    <>
      <h1>ToolTips1</h1>
      <div className="toolTipCanvas"></div>
      <div className="tooltip1"></div>
      <div>{fauxAxis1.toReact()}</div>
    </>
  );
}

export default ToolTips1;
