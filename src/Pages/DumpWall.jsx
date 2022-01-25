import React from "react";
import Footer from "../Components/dumpwall/Footer";
import IdeaCard from "../Components/dumpwall/IdeaCard";
import Navbar from "../Components/dumpwall/Navbar";

const DumpWall = () => {
  return (
    <>
      <div className="dump_wall">
        <Navbar />
        <IdeaCard />
        <Footer />
      </div>
    </>
  );
};

export default DumpWall;
