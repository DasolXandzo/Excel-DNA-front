import logo from './logo.svg';
import * as React from "react";
import DialigWindow from './DialigWindow';
import './App.css';

function App() {
  const urlQueryParameters = new URLSearchParams(window.location.search);
  return (
    <div>
    {/* I'm a dialog window */ urlQueryParameters.get("dialogID") != null && <React.Fragment>
      <DialigWindow dialogID={urlQueryParameters.get("dialogID")} lettersFormula = {urlQueryParameters.get("lettersFormula")} valuesFormula = {urlQueryParameters.get("valuesFormula")} jsonString = {urlQueryParameters.get("jsonString")}/>
          </React.Fragment>}
    {/* I'm NOT a dialog window (I'm the main taskpane ui) */ urlQueryParameters.get("dialogID") == null && <React.Fragment>
      <div>Не диалог</div>
    </React.Fragment>}
  </div>
  );
}

export default App;
