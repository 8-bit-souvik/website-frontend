import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import DumpWall from "./Pages/DumpWall";
import DumpForm from "./Pages/DumpForm";

const App = () => {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/submitIdea" element={<DumpForm />} />
          <Route path="/" element={<DumpWall />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
