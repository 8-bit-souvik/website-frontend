import React, { useEffect, useState } from "react";
import "./IdeaCard.css";
import { getDocs } from "firebase/firestore";
import { ideaRef } from "../../firebase.js";
import Section from "./Section";

import images from "../../../assets/images.jsx";

const Ideacard = () => {
  const [ideaList, setIdeaList] = useState([]);
  const [listSize, setListSize] = useState(4);
  const [listDisplayAction, setAction] = useState("Load More");

  // get collection data
  useEffect(() => {
    getDocs(ideaRef)
      .then((snapshot) => {
        let idea = [];
        snapshot.docs.forEach((doc) => {
          idea.push({ ...doc.data(), id: doc.id });
        });

        let uniqueIdea = [...new Set(idea)]; // remove duplicate elements
        setIdeaList(uniqueIdea);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const ideaListSize = ideaList.length;

  const handleListSize = () => {
    listDisplayAction !== "Load More"
      ? setListSize(4)
      : setListSize(listSize + 4);
    if (listSize + 4 >= ideaListSize) {
      setAction("Load Less");
    }
    if (listSize >= ideaListSize) {
      setAction("Load More");
    }
  };

  return (
    <>
      <section className='dumpwall__ideacard flex__center section__padding'>
        <div className='dumpwall__ideacard-heading'>
          <h1 className='dumpwall__ideacard-headtext'>
            Trending{" "}
            <span>
              Ideas
              <img src={images.ideasTextUnderline} alt='Underline' />
            </span>
          </h1>
        </div>

        {ideaList.slice(0, listSize).map((idea) => {
          return (
            <div
              key={idea.id}
              className='dumpwall__ideacard-container flex__center'
            >
              <div className='dumpwall__ideacard-container-img flex__center'>
                <img src='' alt='' />
              </div>
              <div className='dumpwall__ideacard-container-content'>
                <p className='p__bold'>{idea.name}</p>
                <p className='p__normal'>{idea.description}</p>
              </div>
              <img
                src={images.shareIcon}
                alt='Share'
                className='dumpwall__ideacard-container-share'
              />
              <img
                src={images.upvoteIcon}
                alt='Upvote'
                className='dumpwall__ideacard-container-upvote'
              />
            </div>
          );
        })}
        <button
          type='button'
          className={
            ideaListSize > 4 ? "view custom__button" : "hide custom__button"
          }
          onClick={handleListSize}
        >
          {listDisplayAction}
        </button>
        <div className='dumpwall__section-container flex__center'>
          <Section />
        </div>
      </section>
    </>
  );
};

export default Ideacard;
