import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import DumpWall from "./Pages/DumpWall";
import DumpForm from "./Pages/DumpForm";
import Share from "./Components/dumpwall/Share";

const App = () => {
  return (
    <>
      <div className="body__bg">
        <Routes>
          <Route path="/submitIdea" element={<DumpForm />} />
          <Route path="/share" element={<Share />} />
          <Route path="/" element={<DumpWall />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
