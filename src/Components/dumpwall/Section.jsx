import React from 'react';
import images from '../../images.jsx';
import './Section.css';

const Section = () => {
  return (
    <>
      <div className="dumpwall__section flex__justify">
        <div className="dumpwall__section-leftContainer">
          <p className="p__normal">Lets get in touch on a virtual coffee date! Juss Kidding!</p>
          <p className="p__bold">
            Have some suggestions for our community?
            <br />
            Or just want to have a casual chat?
          </p>
        </div>
        <div className="dumpwall__section-rightContainer">
          <a href="mailto:support@dezenix.com">
            <div className="dumpwall__section-mailLink flex__center">
              <p className="email p__bold">support@dezenix.com</p>
              <img src={images.linkIcon} alt="linkIcon" />
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default Section;
