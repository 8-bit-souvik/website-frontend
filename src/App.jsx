import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import DumpWall from "./Pages/DumpWall";

const App = () => {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<DumpWall />} />
        </Routes>
      </div>
      <div className="copyright">Copyright &copy; 2021 Dezenix</div>
    </>
  );
};

export default App;
