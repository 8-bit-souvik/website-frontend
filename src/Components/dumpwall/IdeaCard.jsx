import React, { useContext, useEffect, useState } from "react";
import "./dumpwall.css";
import { getDocs } from "firebase/firestore";
import { ideaRef } from "../../firebase";

import vote from "../../../images/vote.svg";
import comment from "../../../images/comment.svg";
import share from "../../../images/share.svg";
import upload from "../../../images/upload.svg"

const IdeaCard = () => {
  const [ideaList, setIdeaList] = useState([]);
  const [listSize, setListSize] = useState(4);
  const [listDisplayAction, setAction] = useState("View More");

  // get collection data
  useEffect(() => {
    getDocs(ideaRef)
      .then((snapshot) => {
        let idea = [];
        snapshot.docs.forEach((doc) => {
          idea.push({ ...doc.data(), id: doc.id });
        });
        setIdeaList(idea);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const ideaListSize = ideaList.length;

  const handleListSize = () => {
    (listDisplayAction !== "View More") ? setListSize(4) : setListSize(listSize + 4);
    if (listSize + 4 >= ideaListSize) {
        setAction("View Less");
    }
    if (listSize >= ideaListSize) {
        setAction("View More");
    }
  }

  return (
    <>
      <section className="idea__card">
        <h1 className="heading">Trending Ideas...</h1>

        {ideaList.slice(0, listSize).map((idea) => {
          return (
            <div key={idea.id} className="card__container">
              <div className="card__img__container">
                <img src={upload} alt="" id="idea__img" />
              </div>
              <div className="idea__description__container">
                <h3 className="idea__name">{idea.name}</h3>
                <p className="idea__description">{idea.description}</p>
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
              <div className="vote__container">
                <img title="Upvote this idea" src={vote} alt="" id="vote__img" />
                {/* <p className="vote__count">
              {upVote}
            </p> */}
              </div>
            </div>
          );
        })}
        <div className={(ideaListSize > 4) ? "viewmore" : "hide"}>
                <button className="viewmore__button" onClick={handleListSize}>{listDisplayAction}</button>
        </div>
      </section>
    </>
  );
};

export default IdeaCard;
