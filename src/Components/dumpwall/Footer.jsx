import React from "react";
import "./footer.css";

import discord from "../../../images/discord.svg";
import github from "../../../images/github.svg";
import instagram from "../../../images/instagram.svg";
import linkedin from "../../../images/linkedin.svg";
import twitter from "../../../images/twitter.svg";
import linkicon from "../../../images/link_icon.svg";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div id="left__footer__container" className="footer__container">
          <h2 id="h2__text">Join Us Now</h2>
          <span className="join__link__icons">
            {/* <img id="github__icon" className="link__icons" src={github} alt="" /> */}
            <img className="link__icons" src={linkedin} alt="" />
            <img className="link__icons" src={discord} alt="" />
            <img className="link__icons" src={instagram} alt="" />
            <img className="link__icons" src={twitter} alt="" />
          </span>
        </div>
        <div id="right__footer__container" className="footer__container">
          <h2 className="h2__text">
            Incase of any query or <br />
            suggestion feel free to reach us.
          </h2>
          <a href="mailto:support@dezenix.org">
            <div className="email__link">
              <p className="email">support@dezenix.org</p>
              <img id="email__link__icon" src={linkicon} alt="" />
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
