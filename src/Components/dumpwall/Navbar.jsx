import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [burgerStatus, setBurgerStatus] = useState(false);
  return (
    <>
      <div className="dumpwall__navbar flex__center section__padding">
        <div className="dumpwall__navbar-smallScreen">
          <div
            className="dumpwall__navbar-smallScreen-hamburgerIcon"
            role="button"
            onClick={() => setBurgerStatus(!burgerStatus)}
          >
            <i className={burgerStatus ? "open" : "close"}></i>
            <i className={burgerStatus ? "open" : "close"}></i>
            <i className={burgerStatus ? "open" : "close"}></i>
          </div>
        </div>
        <h1 className="dumpwall__navbar-logoName">dezenix</h1>
        <ul className="dumpwall__navbar-menu">
          <li className="p__normal">home</li>
          <li className="p__normal">about us</li>
        </ul>
        <div className="dumpwall__navbar-submitButton">
          <button className="custom__button">submit idea</button>
        </div>
      </div>
      <div className="dumpwall__navbar-smallScreen">
        {burgerStatus && (
          <div className="dumpwall_navbar-smallScreen-overlay slide_right">
            <ul className="dumpwall__navbar-smallScreen-menu">
              <li
                className="p__normal"
                onClick={() => setBurgerStatus(!burgerStatus)}
              >
                home
              </li>
              <li
                className="p__normal"
                onClick={() => setBurgerStatus(!burgerStatus)}
              >
                about us
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
