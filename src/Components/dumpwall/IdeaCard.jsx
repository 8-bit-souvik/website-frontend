import React, { useEffect, useState } from 'react';
import images, { ideaDisplayImages } from '../../images.jsx';
import Share from './Share';
import ShareModal from './ShareModal.jsx';

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const RandomDisplayImage = ({ id }) => {
  const image = JSON.parse(localStorage.getItem('image_display')) || {};
  let imgNo = image[id];
  if (!imgNo) {
    imgNo = getRandomArbitrary(0, ideaDisplayImages.length);

    image[id] = imgNo;
    localStorage.setItem('image_display', JSON.stringify(image));
  }

  return (
    <img className="dumpwall__ideacard__img" src={ideaDisplayImages[imgNo]} alt="Random image" />
  );
};

export default ({ id, idea, hasUpVoted, hasDownVoted, changeVote }) => {
  const [modalStatus, setModalStatus] = useState(false);
  const [readMore, setReadMore] = useState(false);

  const ideaUpvoted = hasUpVoted.includes(id);
  const ideaDownvoted = hasDownVoted.includes(id);

  console.log(readMore);
  return (
    <div key={id} className="dumpwall__ideacard-container">
      <div className="dumpwall__ideacard-container-img flex__center">
        <RandomDisplayImage id={id} />
      </div>
      <div className="dumpwall__ideacard-container-content">
        <p className="p__bold">{idea.name}</p>
        <p style={{ color: '#97BED6' }} className="p__normal">
          {readMore ? idea.description : idea.description.substring(0, 500)}
        {(idea.description.length) > 500 && (
          // TODO: Fix this button
          <button
            className="readMore"
            onClick={() => setReadMore(!readMore)}
          >
            {!readMore ? '... Read more' : '. Show less'}
          </button>
        )}
        </p>
        <p style={{ color: '#97BED6' }} className="p__normal">
          Submitted on:{' '}
          {new Date(idea.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
      <div className="dumpwall__ideacrad-container-icons flex__justify">
        <div
          className="dumpwall__ideacrad-container-icons-share flex__center"
          onClick={() => setModalStatus(true)}
        >
          <img src={images.shareIcon} alt="Share" className="dumpwall__ideacard-container-share" />
          <p className="p__normal">Share</p>
        </div>
        {modalStatus && <ShareModal idea={idea} setModalStatus={setModalStatus} />}
        {/* TODO: Fix buttons */}
        <div
          className="dumpwall__ideacrad-container-icons-upvote flex__center"
          onClick={() => changeVote(id, true)}
        >
          <img
            src={ideaUpvoted ? images.upvoteIconFilled : images.upvoteIcon}
            alt="Upvote"
            className="dumpwall__ideacard-container-upvote"
          />
          <p className="p__normal">{ideaUpvoted ? 'Upvoted' : 'Upvote'}</p>
          <p className="p__normal">{idea.votes}</p>
        </div>
      </div>
    </div>
  );
};
