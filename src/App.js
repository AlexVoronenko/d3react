import "./App.css";
import ReadJSON from "./Modules/ReadJSON";
import Axis from "./Modules/Axis";
import ToolTips1 from "./Modules/ToolTips1";
import ToolTips2 from "./Modules/ToolTips2";
import ToolTips3 from "./Modules/ToolTips3";
import Chart from "./Modules/Chart";
import { useState } from "react";

const data = [
  { x: 16, y: 2 },
  { x: 36, y: 4 },
  { x: 45, y: -1 },
];

function App() {
  const [valueJSON, setValueJSON] = useState("");
  const [valueAxis, setValueAxis] = useState("");
  const [valueToolTips1, setToolTips1] = useState("");
  const [valueToolTips2, setToolTips2] = useState("");
  const [valueToolTips3, setToolTips3] = useState("");
  const [newData, setData] = useState("");

  const handleChangeJSON = (valueJSON) => {
    setValueJSON(valueJSON);
  };

  const handleChangeAxis = (event) => {
    setValueAxis(data);
  };

  const handleChangeToolTips1 = (event) => {
    setToolTips1(data);
  };
  const handleChangeToolTips2 = (event) => {
    setToolTips2(data);
  };
  const handleChangeToolTips3 = (event) => {
    setToolTips3(data);
  };

  const changeDataComponent = (e) => {
    setData(data);
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
        <button type="button" onClick={handleChangeToolTips1}>
          (App): Отобразить ToolTips1(на html-div окне) на точках (не работает)
        </button>
        <ToolTips1 toolTipData={valueToolTips1}></ToolTips1>
      </div>
      <div>
        <button type="button" onClick={handleChangeToolTips2}>
          (App): Отобразить ToolTips2(простой .append("title")) на точках
        </button>
        <ToolTips2 toolTipData={valueToolTips2} />
      </div>
      <div>
        <button type="button" onClick={handleChangeToolTips3}>
          (App): Отобразить ToolTips3(npm i tippy.js) на точках
        </button>
        <ToolTips3 toolTipData={valueToolTips3} />
      </div>
      <div>
        <button onClick={changeDataComponent}></button>
        <Chart data={newData} />
      </div>
    </>
  );
}

export default App;
