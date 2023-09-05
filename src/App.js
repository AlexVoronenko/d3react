import "./App.css";
import ReadJSON from "./Modules/ReadJSON";
import Axis from "./Modules/Axis";
import ToolTips from "./Modules/ToolTips";
import { useState } from "react";

const data = [
  { x: 16, y: 2 },
  { x: 36, y: 4 },
  { x: 45, y: -1 },
];

function App() {
  const [valueJSON, setValueJSON] = useState("");
  const [valueAxis, setValueAxis] = useState("");
  const [valueToolTips, setToolTips] = useState("");

  const handleChangeJSON = (valueJSON) => {
    setValueJSON(valueJSON);
  };

  const handleChangeAxis = (event) => {
    setValueAxis(data);
  };

  const handleChangeToolTips = (event) => {
    setToolTips(data);
  };

  return (
    <>
      <div>
        <ReadJSON onChange={handleChangeJSON}></ReadJSON>
        <br />
        <span>(App):{valueJSON || "Not set"}</span>
      </div>
      <hr />
      <button type="button" onClick={handleChangeAxis}>
        (App): Нарисовать оси Axis (передача данных parent-child)
      </button>
      <Axis axisData={valueAxis} />
      <hr />
      <div>
        <button type="button" onClick={handleChangeToolTips}>
          (App): Отобразить ToolTips на точках
        </button>
        <ToolTips toolTipData={valueToolTips}></ToolTips>
      </div>
    </>
  );
}

export default App;
