import logo from './logo.svg';
import * as React from "react";
import DialogWindow from './components/DialogWindow';
import './App.css';

function App() {
  const urlQueryParameters = new URLSearchParams(window.location.search);
  return (
    <div>
    {/* I'm a dialog window */ urlQueryParameters.get("windowType") != null && <React.Fragment>
      <DialogWindow windowType={urlQueryParameters.get("windowType")} jsonString = {urlQueryParameters.get("jsonString")} lettersFormula={urlQueryParameters.get("lettersFormula")}/>
          </React.Fragment>}
    {/* I'm NOT a dialog window (I'm the main taskpane ui) */ urlQueryParameters.get("windowType") == null && <React.Fragment>
      <div>Не диалог</div>
    </React.Fragment>}
  </div>
  );
}

export default App;
