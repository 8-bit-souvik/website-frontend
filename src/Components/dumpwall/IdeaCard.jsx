import React, { useEffect, useState } from "react";
import "./IdeaCard.css";
import { getDocs, doc, updateDoc } from "firebase/firestore";
import { ideaRef, db } from "../../firebase.js";
import Section from "./Section";
import images from "../../../assets/images.jsx";

// check whether list of ideas has been stored in LS
const getLocalIdeas = () => {
  let list = localStorage.getItem("ideas");
  if (list) {
    return JSON.parse(localStorage.getItem("ideas"));
  } else {
    return [];
  }
};

// check whether bool list of votes has been stored in LS
const getLocalVoteState = () => {
  let list = localStorage.getItem("voted");
  if (list) {
    return JSON.parse(localStorage.getItem("voted"));
  } else {
    return false;
  }
};

const Ideacard = () => {
  const [listDisplayAction, setAction] = useState("Load More");
  const [ideaList, setIdeaList] = useState([]);
  const [listSize, setListSize] = useState(4);
  const [hasVoted, setHasVoted] = useState(getLocalIdeas());
  const insideLocalStorage = getLocalVoteState();

  // get collection data
  useEffect(() => {
    getDocs(ideaRef)
      .then((snapshot) => {
        let idea = [];
        snapshot.docs.forEach((doc) => {
          idea.push({ ...doc.data(), id: doc.id });
        });
        let uniqueIdeas = [...new Set(idea)]; // remove duplicate elements
        setIdeaList(uniqueIdeas);

        if (insideLocalStorage === false) {
          const votesList = []; // create a list of ids -> votes
          for (let i = 0; i < uniqueIdeas.length; i++) {
            votesList.push({ id: uniqueIdeas[i].id, voteBool: false });
          }
          setHasVoted(votesList);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleListSize = () => {
    let ideaListSize = ideaList.length;
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

  const upVote = (id) => {
    let ideaToBeUpdated = doc(db, "ideas", id);
    let idea = ideaList.find((idea) => idea.id === id);

    // update vote in hasVoted array, if not the user can vote multiple times
    const newVotesList = hasVoted.map((element) => {
      if (element.id === id) {
        return { ...element, voteBool: true };
      }
      return element;
    });
    setHasVoted(newVotesList);

    updateDoc(ideaToBeUpdated, {
      votes: idea.votes + 1,
    }).then(() => {
      // update votes of specific idea ONLY
      const updatedIdeaList = ideaList.map((element) => {
        if (element.id === id) {
          return { ...element, votes: idea.votes + 1 };
        }
        return element;
      });
      setIdeaList(updatedIdeaList);
    });
  };

  // add boolean list of votes & store-state in localStorage
  useEffect(() => {
    localStorage.setItem("ideas", JSON.stringify(hasVoted));
    localStorage.setItem("voted", JSON.stringify(true));
  }, [hasVoted]);

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

        {ideaList
          ?.sort((i1, i2) => (i1.votes > i2.votes ? -1 : 1))
          .slice(0, listSize)
          .map((idea) => {
            return (
              <div key={idea.id} className='dumpwall__ideacard-container'>
                <div className='dumpwall__ideacard-container-img flex__center'>
                  <img src='' alt='' />
                </div>
                <div className='dumpwall__ideacard-container-content'>
                  <p className='p__bold'>{idea.name}</p>
                  <p style={{ color: "#97BED6" }} className='p__normal'>
                    {idea.description}
                  </p>
                  <p style={{ color: "#97BED6" }} className='p__normal'>
                    Submitted on: {idea.date}
                  </p>
                </div>
                <div className='dumpwall__ideacrad-container-icons flex__justify'>
                  <div className='dumpwall__ideacrad-container-icons-share flex__center'>
                    <img
                      src={images.shareIcon}
                      alt='Share'
                      className='dumpwall__ideacard-container-share'
                    />
                    <p className='p__normal'>Share</p>
                  </div>
                  <div
                    className='dumpwall__ideacrad-container-icons-upvote flex__center'
                    onClick={() => {
                      if (
                        hasVoted.find((item) => item.id === idea.id)
                          .voteBool === false
                      ) {
                        upVote(idea.id);
                      }
                    }}
                  >
                    <img
                      src={images.upvoteIcon}
                      alt='Upvote'
                      className='dumpwall__ideacard-container-upvote'
                    />
                    <p className='p__normal'>Upvote</p>
                    <p className='p__normal'>{idea.votes}</p>
                  </div>
                </div>
              </div>
            );
          })}
        <button
          type='button'
          className={
            ideaList.length > 4 ? "view custom__button" : "hide custom__button"
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
