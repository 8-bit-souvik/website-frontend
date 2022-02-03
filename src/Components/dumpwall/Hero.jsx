import React from "react";
import "./Hero.css";

import images from "../../../assets/images";

const Hero = () => (
  <div className="dumpwall__hero flex__justify section__padding">
    <div className="dumpwall__hero-content">
      <div className="dumpwall__hero-content-heading">
        <h1 className="dumpwall__hero-content-headtext">
          Convert your
          <br /> <span>ideas to product</span>
        </h1>
        <img src={images.productTextWrapper} alt="" />
      </div>
      <div className="dumpwall__hero-content-info flex__justify">
        <p className="p__normal">
          Have an idea? Share it with us.
          <br />
          We dont charge you for anything!
        </p>
        <button className="custom__button">Submit your Idea</button>
      </div>
    </div>
    <div className="dumpwall__hero-logo">
      <img src={images.headerImage} alt="DezenixLogo" />
    </div>
  </div>
);

export default Hero;
