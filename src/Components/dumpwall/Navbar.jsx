import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import DumpForm from "../../Pages/DumpForm";
import "./dumpwall.css";

import logo from "../../../images/logo.svg";

const Navbar = () => {
  const [burgerStatus, setBurgerStatus] = useState("close");
  return (
    <>
      <nav className="nav__bar">
        <div className="navigation">
          <span className="logo">
            <img
              src={logo}
              title="Dezenix"
              alt="Dezenix logo"
              className="logo__img"
            />
          </span>
          <div className="navbar__buttons">
            <Link to="/"><button className="navigation__buttons">home</button></Link>
            <button className="navigation__buttons">about us</button>
            <Link to="/submitIdea">
              <button id="submit__idea" className="navigation__buttons">submit idea</button>
            </Link>
          </div>
        </div>
        <div className="mobile__navigation">
          <div
            role="button"
            onClick={() =>
              setBurgerStatus(burgerStatus === "open" ? "close" : "open")
            }
            className="hamburger__menu"
          >
            <i className={burgerStatus}></i>
            <i className={burgerStatus}></i>
            <i className={burgerStatus}></i>
          </div>
          <span className="logo">
            <img
              src={logo}
              title="Dezenix"
              alt="Dezenix logo"
              className="logo__img"
            />
          </span>
          <Link to="/submitIdea">
            <button id="submit__idea" className="navigation__buttons">submit idea</button>
          </Link>
        </div>
      </nav>
      <div id={burgerStatus}>
        <Link to="/">
          <button
            id="burger__buttons"
            className="navigation__buttons"
            onClick={() =>
              setBurgerStatus(burgerStatus === "open" ? "close" : "open")
            }
          >
            home
          </button>
        </Link>
        <button
          id="burger__buttons"
          className="navigation__buttons"
          onClick={() =>
            setBurgerStatus(burgerStatus === "open" ? "close" : "open")
          }
        >
          about us
        </button>
      </div>
      <Routes>
          <Route path="/submitIdea" element={<DumpForm />} />
      </Routes>
    </>
  );
};

export default Navbar;
