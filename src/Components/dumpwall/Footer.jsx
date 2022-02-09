import React from "react";
import "./Footer.css";
import images from "../../../assets/images.jsx";

const Footer = () => {
  return (
    <>
      <div className="dumpwall__footer flex__justify section__padding">
        <div className="dumpwall__footer-container">
          <div className="dumpwall__footer-container-heading">
            <img src={images.dezenixLogo} title="Dezenix" alt="Dezenix logo" />
            <h2 className="p__bold">dezenix</h2>
          </div>
          <p className="footer__para p__normal">
            Dezenix is a community of kick🍑 developers and designers.
            <br />
            Learning together and growing together each and every day.
          </p>
        </div>
        <div className="dumpwall__footer-container">
          <h2
            style={{ padding: "4px 0" }}
            className="dumpwall__footer-container-heading p__bold"
          >
            Join Us Now
          </h2>
          <span className="join__link__icons">
            <a
              href="https://github.com/dezenix"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="link__icons" src={images.githubIcon} alt="" />
            </a>
            <a
              href="https://www.linkedin.com/company/dezenix/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="link__icons" src={images.linkedinIcon} alt="" />
            </a>
            <a
              href="https://discord.io/dezenix"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="link__icons" src={images.discordIcon} alt="" />
            </a>
            <a
              href="https://www.instagram.com/dezenixofficial/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="link__icons" src={images.instagramIcon} alt="" />
            </a>
            <a
              href="https://twitter.com/dezenix"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="link__icons" src={images.twitterIcon} alt="" />
            </a>
          </span>
        </div>
      </div>
    </>
  );
};

export default Footer;
