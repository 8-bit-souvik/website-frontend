import React, { useContext, useState } from "react";
import "./dumpwall.css";

import vote from "../../../images/vote.svg";
import comment from "../../../images/comment.svg";
import share from "../../../images/share.svg";

const IdeaCard = (props) => {
  return (
    <>
      <section className="idea__card">
        <h1 className="heading">Trending Idea..</h1>
        <div className="card__container">
          <span className="card__img__container"></span>
          <div className="idea__description__container">
            <h3 className="idea__name">Your Idea Name</h3>
            <p className="idea__description">
              Complete description of the product Complete description of the
              product Complete description of the product
            </p>
            <span className="links__container">
              <p className="comment__share__link">
                <img src={comment} alt="" className="comment__share__img" />
                comment
              </p>
              <p className="comment__share__link">
                <img src={share} alt="" className="comment__share__img" />
                share
              </p>
            </span>
          </div>
          <span className="vote__container">
            <img src={vote} alt="" className="vote__img" />
            {/* <p className="vote__count">
              {upVote}
            </p> */}
          </span>
        </div>
      </section>
    </>
  );
};

export default IdeaCard;
