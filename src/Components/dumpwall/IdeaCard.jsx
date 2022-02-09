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
const getLocalIdeas = () => {
  let list = localStorage.getItem("ideas");
  if (list) {
    return JSON.parse(localStorage.getItem("ideas"));
  } else {
    return [];
  }
};

const RandomDisplayImage = () => {
  let imgNo = 1;
  return (
    ideaDisplayImages.filter((imgId) => (imgId.id == imgNo)).map((image) => {
      return (
        <img
          src={image}
          alt=""
        />
      );
      imgNo = ((imgNo % 4) + 1);
    })
  );
};

const Ideacard = () => {
  const [listDisplayAction, setAction] = useState(LOAD_MORE_ACTION);
  const [ideaList, setIdeaList] = useState({});
  const [listSize, setListSize] = useState(LOAD_MORE_SIZE);
  const [hasVoted, setHasVoted] = useState(getLocalIdeas()); // ['id', 'id1', 'id2'...]
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

  const changeVote = async (id, upvote) => {
    const ideaToBeUpdated = doc(db, "ideas", id);
    const idea = ideaList[id];
    const votes = upvote ? idea.votes + 1 : idea.votes - 1;

    if (upvote && !hasVoted.includes(id)) {
      setHasVoted([...hasVoted, id]);
    }

    if (!upvote && hasVoted.includes(id)) {
      const index = hasVoted.findIndex((val) => val === id);
      setHasVoted([
        ...hasVoted.slice(0, index),
        ...hasVoted.slice(index + 1, hasVoted.length),
      ]);
    }

    const tmpIdeaList = ideaList;
    tmpIdeaList[id] = { ...idea, votes };
    setIdeaList({ ...tmpIdeaList });

    await updateDoc(ideaToBeUpdated, { votes });
  };

  useEffect(
    (id) => {
      localStorage.setItem("ideas", JSON.stringify(hasVoted));
    },
    [hasVoted]
  );

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
          const ideaUpvoted = hasVoted.includes(id);

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
                      Read More
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
                          <div
                            className="dumpwall__ideacrad-container-icons-upvote flex__center"
                            onClick={() => changeVote(id, !ideaUpvoted)}
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
                              {ideaUpvoted ? "Downvote" : "Upvote"}
                            </p>
                            <p className="p__normal">{idea.votes}</p>
                          </div>
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
                  <div
                    className="dumpwall__ideacrad-container-icons-upvote flex__center"
                    onClick={() => changeVote(id, !ideaUpvoted)}
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
                      {ideaUpvoted ? "Downvote" : "Upvote"}
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
          {listDisplayAction}
        </button>
        <div className="dumpwall__section-container flex__center">
          <Section />
        </div>
      </section>
    </>
  );
};

export default Ideacard;
