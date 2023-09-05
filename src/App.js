import "./App.css";
import ReadJSON from "./Modules/ReadJSON";
import Axis from "./Modules/Axis";
import { useState } from "react";

const data = [
  { x: 16, y: 2 },
  { x: 36, y: 4 },
  { x: 45, y: -1 },
];

function App() {
  const [valueAxis, setValueAxis] = useState("");
  const [valueJSON, setValueJSON] = useState("");

  const handleChangeJSON = (valueJSON) => {
    setValueJSON(valueJSON);
  };

  const handleChangeAxis = (event) => {
    setValueAxis(data);
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
      <Axis data={valueAxis} />
    </>
  );
}

export default App;
