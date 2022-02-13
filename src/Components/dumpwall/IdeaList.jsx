import React, { useEffect, useState } from 'react';
import './IdeaList.css';
import { getDocs, doc, updateDoc } from 'firebase/firestore';
import { ideaRef, db } from '../../firebase.js';
import Section from './Section';
import IdeaCard from './IdeaCard';
import images from '../../images.jsx';

const LOAD_MORE_SIZE = 4;
const LOAD_MORE_ACTION = 'Load More';

// check whether list of ideas has been stored in LS
const getLocalUpvoted = () => {
  return JSON.parse(localStorage.getItem('upvoted')) || [];
};

const getLocalDownvoted = () => {
  return JSON.parse(localStorage.getItem('downvoted')) || [];
};

const IdeaList = () => {
  const [ideaList, setIdeaList] = useState({});
  const [listSize, setListSize] = useState(LOAD_MORE_SIZE);
  const [hasUpVoted, setHasUpVoted] = useState(getLocalUpvoted()); // ['id', 'id1', 'id2'...]
  const [hasDownVoted, setHasDownVoted] = useState(getLocalDownvoted()); // ['id', 'id1', 'id2'...]

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
    const ideaToBeUpdated = doc(db, 'ideas', id);
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
    localStorage.setItem('upvoted', JSON.stringify(hasUpVoted));
  }, [hasUpVoted]);

  useEffect(() => {
    localStorage.setItem('downvoted', JSON.stringify(hasDownVoted));
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
            Trending{' '}
            <span>
              Ideas
              <img src={images.ideasTextUnderline} alt="Underline" />
            </span>
          </h1>
        </div>

        {ideaKeys.map((id, index) => {
          const idea = ideaList[id];

          if (index + 1 <= listSize) {
            return (
              <IdeaCard
                key={id}
                id={id}
                idea={idea}
                changeVote={changeVote}
                hasUpVoted={hasUpVoted}
                hasDownVoted={hasDownVoted}
              />
            );
          }
        })}
        <button
          type="button"
          className={ideaKeys.length >= listSize ? 'view custom__button' : 'hide custom__button'}
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

export default IdeaList;
