import React, { useEffect, useState } from "react";
import "./IdeaCard.css";
import { getDocs, doc, updateDoc } from "firebase/firestore";
import { ideaRef, db } from "../../firebase.js";
import Section from "./Section";
import images from "../../../assets/images.jsx";
import ideaDisplayImages from "../../../assets/DisplayImages";
import Share from "./Share";

const LOAD_MORE_SIZE = 4;
const LOAD_MORE_ACTION = "Load More";

// check whether list of ideas has been stored in LS
const getLocalUpvoted = () => {
  return JSON.parse(localStorage.getItem("upvoted")) || [];
};

const getLocalDownvoted = () => {
  return JSON.parse(localStorage.getItem("downvoted")) || [];
};

const RandomDisplayImage = () => {
  let imgNo = 1;
  return ideaDisplayImages
    .filter((imgId) => imgId.id == imgNo)
    .map((image) => {
      return <img src={image} alt="" />;
      imgNo = (imgNo % 4) + 1;
    });
};

const Ideacard = () => {
  const [ideaList, setIdeaList] = useState({});
  const [listSize, setListSize] = useState(LOAD_MORE_SIZE);
  const [hasUpVoted, setHasUpVoted] = useState(getLocalUpvoted()); // ['id', 'id1', 'id2'...]
  const [hasDownVoted, setHasDownVoted] = useState(getLocalDownvoted()); // ['id', 'id1', 'id2'...]
  const [modalStatus, setModalStatus] = useState(false);
  const [shareID, setShareID] = useState(null);
  const [ideaModalStatus, setIdeaModalStatus] = useState(false);

  useEffect(async () => {
    const docs = await getDocs(ideaRef);
    for (const idea of docs.docs) {
      const data = idea.data();
      const id = idea.id;
      if (!ideaList[id]) {
        const tmpIdeaList = ideaList;
        tmpIdeaList[id] = data;
        setIdeaList({ ...tmpIdeaList });
      }
    }
  }, []);

  const handleListSize = () => {
    setListSize(listSize + LOAD_MORE_SIZE);
  };

  const removeAtIndex = (list, index) => {
    const tmp = [...list];
    tmp.splice(index, 1);
    return tmp;
  };

  /**
   *
   * @param {string} id firebase generated of the idea
   * @param {boolean} upvote true if upvote button is clicked.
   *                         false if downvote button is clicked.
   */
  const changeVote = async (id, upvote) => {
    const ideaToBeUpdated = doc(db, "ideas", id);
    const idea = ideaList[id];

    const isIdeaUpvotedIndex = hasUpVoted.findIndex((val) => val === id);
    const isIdeaDownvotedIndex = hasDownVoted.findIndex((val) => val === id);

    let votes = idea.votes;

    // Shouldn't happen since an idea can't be upvoted and downvoted at the same time
    if (isIdeaUpvotedIndex !== -1 && isIdeaDownvotedIndex !== -1) {
      return;
    }

    if (isIdeaUpvotedIndex !== -1) {
      // If upvote button is clicked
      if (upvote) {
        votes -= 1;
      }

      // If downvote button is clicked
      if (!upvote) {
        // -2 since we first have to remove the upvote effect and then add the downvote effect
        votes -= 2;

        // Add idea to downvoted list
        setHasDownVoted([...hasDownVoted, id]);
      }

      // Remove idea from upvoted list
      setHasUpVoted([...removeAtIndex(hasUpVoted, isIdeaUpvotedIndex)]);
    }

    if (isIdeaDownvotedIndex !== -1) {
      // If upvote button is clicked
      if (upvote) {
        // +2 since we first have to remove the downvote effect and then add the upvote effect
        votes += 2;

        // Add idea to upvoted list
        setHasUpVoted([...hasUpVoted, id]);
      }

      // If downvote button is clicked
      if (!upvote) {
        votes += 1;
      }

      // Remove idea from downvoted list
      setHasDownVoted([...removeAtIndex(hasDownVoted, isIdeaDownvotedIndex)]);
    }

    // If neither of the buttons are pressed
    if (isIdeaUpvotedIndex === -1 && isIdeaDownvotedIndex === -1) {
      // If upvote button is clicked
      if (upvote) {
        votes += 1;
        setHasUpVoted([...hasUpVoted, id]);
      }

      // If downvote button is clicked
      if (!upvote) {
        votes -= 1;
        setHasDownVoted([...hasDownVoted, id]);
      }
    }

    const tmpIdeaList = ideaList;
    tmpIdeaList[id] = { ...idea, votes };
    setIdeaList({ ...tmpIdeaList });

    await updateDoc(ideaToBeUpdated, { votes });
  };

  useEffect(() => {
    localStorage.setItem("upvoted", JSON.stringify(hasUpVoted));
  }, [hasUpVoted]);

  useEffect(() => {
    localStorage.setItem("downvoted", JSON.stringify(hasDownVoted));
  }, [hasDownVoted]);

  const ideaKeys = Object.keys(ideaList);
  ideaKeys.sort((a, b) => {
    return ideaList[b].votes - ideaList[a].votes;
  });

  return (
    <>
      <section className="dumpwall__ideacard flex__center section__padding">
        <div className="dumpwall__ideacard-heading">
          <h1 className="dumpwall__ideacard-headtext">
            Trending{" "}
            <span>
              Ideas
              <img src={images.ideasTextUnderline} alt="Underline" />
            </span>
          </h1>
        </div>

        {ideaKeys.map((id, index) => {
          const idea = ideaList[id];
          const ideaUpvoted = hasUpVoted.includes(id);
          const ideaDownvoted = hasDownVoted.includes(id);

          if (index + 1 <= listSize) {
            return (
              <div key={id} className="dumpwall__ideacard-container">
                <div className="dumpwall__ideacard-container-img flex__center">
                  <RandomDisplayImage />
                </div>
                <div className="dumpwall__ideacard-container-content">
                  <p className="p__bold">{idea.name}</p>
                  <p style={{ color: "#97BED6" }} className="p__normal">
                    {idea.description.substring(0, 500)}...
                    <button
                      className="p__normal readMore"
                      onClick={() => setIdeaModalStatus(true)}
                    >
                      read more
                    </button>
                  </p>
                  {ideaModalStatus && (
                    <div className="dumpwall__ideacrad-modaWindow-overlay flex__center slide__bottom">
                      <div
                        style={{ backgroundColor: "blue" }}
                        className="dumpwall__ideacrad-ideaModaWindow flex__center"
                      >
                        <p
                          title="Close"
                          className="dumpwall__ideacrad-modaWindow-modalClose p__bold"
                          onClick={() => setIdeaModalStatus(false)}
                        >
                          X
                        </p>
                        <p style={{ fontWeight: "300" }} className="p__bold">
                          Idea Detail
                        </p>
                        <p className="p__normal">
                          Feel free to share your ideas and community will help
                          you to turn it into a product.Feel free to share your
                          ideas and community will help you to turn it into a
                          product.Feel free to share your ideas and community
                          will help you to turn it into a product.Feel free to
                          share your ideas and community will help you to turn
                          it into a product.Feel free to share your ideas and
                          community will help you to turn it into a product.Feel
                          free to share your ideas and community will help you
                          to turn it into a product.Feel free to share your
                          ideas and community will help you to turn it into a
                          product.Feel free to share your ideas and community
                          will help you to turn it into a product.Feel free to
                          share your ideas and community will help you to turn
                          it into a product.Feel free to share your ideas and
                          community will help you to turn it into a product.Feel
                          free to share your ideas and community will help you
                          to turn it into a product.
                        </p>
                        <div className="flex__center"></div>
                        <p className="p__bold">OR</p>
                        <p className="p__bold">Link: </p>
                        <p className="p__normal">https://www.google.co.in/</p>
                        <div className="dumpwall__ideacrad-container-icons flex__justify">
                          <div
                            className="dumpwall__ideacrad-container-icons-share flex__center"
                            onClick={() => {
                              setShareID(id);
                              setModalStatus(true);
                            }}
                          >
                            <img
                              src={images.shareIcon}
                              alt="Share"
                              className="dumpwall__ideacard-container-share"
                            />
                            <p className="p__normal">Share</p>
                          </div>
                          {modalStatus && (
                            <div className="dumpwall__ideacrad-modaWindow-overlay flex__center">
                              <div className="dumpwall__ideacrad-modaWindow-iconsContainer flex__center">
                                <p
                                  title="Close"
                                  className="dumpwall__ideacrad-modaWindow-modalClose p__bold"
                                  onClick={() => setModalStatus(false)}
                                >
                                  X
                                </p>
                                <Share
                                  idea={ideaList[shareID]}
                                  closeModal={setModalStatus}
                                />
                              </div>
                            </div>
                          )}
                          {/* <div
                            className="dumpwall__ideacrad-container-icons-upvote flex__center"
                            onClick={() => changeVote(id, !ideaUpvoted)}
                          >
                            <img
                              src={ideaUpvoted ? images.upvoteIconFilled : images.upvoteIcon}
                              alt="Upvote"
                              className="dumpwall__ideacard-container-upvote"
                            />
                            <p className="p__normal">Upvote</p>
                            <p className="p__normal">{idea.votes}</p>
                          </div> */}

                          {/* <div
                            className="dumpwall__ideacrad-container-icons-upvote flex__center kek"
                            onClick={() => changeVote(id, !ideaUpvoted)}
                          >
                            <img
                              src={ideaDownvoted ? images.upvoteIconFilled : images.upvoteIcon}
                              alt="Downvote"
                              className="dumpwall__ideacard-container-upvote"
                            />
                            <p className="p__normal">Downvote</p>
                            <p className="p__normal">{idea.votes}</p>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  )}
                  <p style={{ color: "#97BED6" }} className="p__normal">
                    Submitted on:{" "}
                    {new Date(idea.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="dumpwall__ideacrad-container-icons flex__justify">
                  <div
                    className="dumpwall__ideacrad-container-icons-share flex__center"
                    onClick={() => {
                      setShareID(id);
                      setModalStatus(true);
                    }}
                  >
                    <img
                      src={images.shareIcon}
                      alt="Share"
                      className="dumpwall__ideacard-container-share"
                    />
                    <p className="p__normal">Share</p>
                  </div>
                  {modalStatus && (
                    <div className="dumpwall__ideacrad-modaWindow-overlay flex__center">
                      <div className="dumpwall__ideacrad-modaWindow-iconsContainer flex__center">
                        <p
                          title="Close"
                          className="dumpwall__ideacrad-modaWindow-modalClose p__bold"
                          onClick={() => setModalStatus(false)}
                        >
                          X
                        </p>
                        <Share
                          idea={ideaList[shareID]}
                          closeModal={setModalStatus}
                        />
                      </div>
                    </div>
                  )}
                  {/* TODO: Fix buttons */}
                  <div
                    className="dumpwall__ideacrad-container-icons-upvote flex__center"
                    onClick={() => changeVote(id, true)}
                  >
                    <img
                      src={
                        ideaUpvoted
                          ? images.upvoteIconFilled
                          : images.upvoteIcon
                      }
                      alt="Upvote"
                      className="dumpwall__ideacard-container-upvote"
                    />
                    <p className="p__normal">
                      {ideaUpvoted ? "Upvoted" : "Upvote"}
                    </p>
                    <p className="p__normal">{idea.votes}</p>
                  </div>
                </div>
              </div>
            );
          }
        })}
        <button
          type="button"
          className={
            ideaKeys.length >= listSize
              ? "view custom__button"
              : "hide custom__button"
          }
          onClick={handleListSize}
        >
          {LOAD_MORE_ACTION}
        </button>
        <div className="dumpwall__section-container flex__center">
          <Section />
        </div>
      </section>
    </>
  );
};

export default Ideacard;
