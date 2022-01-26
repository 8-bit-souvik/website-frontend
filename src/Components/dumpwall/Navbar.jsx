import React, { useState } from "react";
import "./dumpwall.css";

import logo from "../../../images/logo.svg";

const Navbar = () => {
  const [burgerStatus, setBurgerStatus] = useState ("close");
  return (
    <>
      <nav class="nav__bar">
        <div className="navigation">
          <span class="logo">
            <img src={logo} title="Dezenix" alt="Dezenix logo" class="logo__img" />
          </span>
          <div class="navbar__buttons">
              <button class="navigation__buttons">home</button>
              <button class="navigation__buttons">about us</button>
              <button id="submit__idea" class="navigation__buttons">submit idea</button>
          </div>
        </div>
        <div className="mobile__navigation">
          <div role="button" onClick={() => setBurgerStatus((burgerStatus === "open") ? "close" : "open")} className="hamburger__menu">
            <i className={burgerStatus}></i>
            <i className={burgerStatus}></i>
            <i className={burgerStatus}></i>
          </div>
          <span class="logo">
            <img src={logo} title="Dezenix" alt="Dezenix logo" class="logo__img" />
          </span>
          <button id="submit__idea" class="navigation__buttons">submit idea</button>
        </div>
    </nav>
    <div id={burgerStatus}>
      <button id="burger__buttons" class="navigation__buttons" onClick={() => setBurgerStatus((burgerStatus === "open") ? "close" : "open")}>home</button>
      <button id="burger__buttons" class="navigation__buttons" onClick={() => setBurgerStatus((burgerStatus === "open") ? "close" : "open")}>about us</button>
    </div>
    </>
  );
};

export default Navbar;
