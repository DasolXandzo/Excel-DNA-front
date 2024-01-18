import * as React from "react";
import CreateTreePage from './components/Pages/CreateTreePage';
import ErrorFormPage from './components/Pages/ErrorFormPage';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const urlQueryParameters = new URLSearchParams(window.location.search);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="CreateTreePage" element={<CreateTreePage jsonString = {urlQueryParameters.get("jsonString")} lettersFormula={urlQueryParameters.get("lettersFormula")}/>} />
        <Route path="ErrorFormPage" element={<ErrorFormPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
