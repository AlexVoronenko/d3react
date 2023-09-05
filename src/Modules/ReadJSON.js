import jsonFile from "./json/d3rio.json";

function ReadJSON({ onChange }) {
  const handleChange = (event) => {
    onChange(event.target.value); // callback-функция
  };

  console.log(jsonFile);
  return (
    <>
      <h1>ReadJSON component</h1>
      <p>Нажмите на textArea для экспорта данных родителю(передача данных child-parent)</p>
      <textarea
        name="json"
        id=""
        cols="130"
        rows="10"
        defaultValue={JSON.stringify(jsonFile)}
        onClick={handleChange}></textarea>
    </>
  );
}

export default ReadJSON;
