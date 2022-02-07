import React from "react";
import "./Hero.css";
import { Link } from "react-router-dom";
import images from "../../../assets/images";

const Hero = () => (
  <div className="dumpwall__hero flex__justify section__padding">
    <div className="dumpwall__hero-content">
      <h1 className="dumpwall__hero-content-headtext">
        Convert your
        <br />
        <span>ideas to product</span>
      </h1>
      {/* <img src={images.productTextWrapper} alt="" /> */}
      <div className="dumpwall__hero-logo">
        <div className="flex__center header__logo-container">
          <img
            src={images.headerLogo}
            alt="DezenixLogo"
            className="header__logo"
          />
          <img src={images.cylinder} alt="" />
        </div>
      </div>
      <div className="dumpwall__hero-content-info">
        <p className="p__normal">
          Have an idea? Share it with us.
          <br />
          We dont charge you for anything!
        </p>
        <Link to="/submitIdea">
          <button className="custom__button">Submit your Idea</button>
        </Link>
      </div>
    </div>
  </div>
);

export default Hero;
