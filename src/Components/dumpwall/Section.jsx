import React from "react";
import images from "../../../assets/images.jsx";
import "./Section.css";

const Section = () => {
  return (
    <>
      <div className="dumpwall__section flex__justify">
        <div className="dumpwall__section-leftContainer">
          <p
            style={{ fontSize: "16px", color: "#80ED99", fontWeight: "200" }}
            className="p__normal"
          >
            Lets get in touch on a virtual coffee date! Juss Kidding!
          </p>
          <p style={{ fontSize: "20px", color: "white" }} className="p__bold">
            Have some suggestions for our community?
            <br />
            Or just want to have a casual chat?
          </p>
        </div>
        <div className="dumpwall__section-rightContainer">
          <a href="mailto:support@dezenix.org">
            <div className="dumpwall__section-mailLink flex__center">
              <p className="email p__bold">support@dezenix.org</p>
              <img src={images.linkIcon} alt="linkIcon" />
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default Section;
