import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <div className="dumpwall__navbar flex__center section__padding">
        <h1 className="dumpwall__navbar-logoName">dezenix</h1>
        <ul className="dumpwall__navbar-menu">
          <li className="p__normal">home</li>
          <li className="p__normal">about us</li>
        </ul>
        <div className="dumpwall__navbar-submitButton">
          <Link to="submitIdea">
            <button className="custom__button">submit idea</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
