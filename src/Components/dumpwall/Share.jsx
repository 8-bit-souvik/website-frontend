import React from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  FacebookIcon,
  LinkedinIcon,
  RedditIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

const Share = ({ name, description }) => {
  const data = {
    title:
<<<<<<< HEAD
      new Date(Date.now()).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }) +
      "\n\n" +
      "Idea name: " +
      name +
      "\n" +
      "Idea description: " +
      description +
      "\n\n",
    url: "https://dezenix.com",
=======
      new Date(Date.now()).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }) +
      '\n\n' +
      'Idea name: ' +
      name +
      '\n' +
      'Idea description: ' +
      description +
      '\n\n',
    url: 'https://dezenix.com',
>>>>>>> 6f35f4e45571bede797e95b40c83f54689a68f84
  };

  return (
    <>
<<<<<<< HEAD
      <div className="social__media">
=======
      <div className='social__media'>
>>>>>>> 6f35f4e45571bede797e95b40c83f54689a68f84
        <WhatsappShareButton url={data.url} title={data.title}>
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>
        <TwitterShareButton url={data.url} title={data.title}>
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
        <RedditShareButton url={data.url} title={data.title}>
          <RedditIcon size={32} round={true} />
        </RedditShareButton>
        <LinkedinShareButton url={data.url} title={data.title}>
          <LinkedinIcon size={32} round={true} />
        </LinkedinShareButton>
        <FacebookShareButton url={data.url} title={data.title}>
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
      </div>
    </>
  );
};

export default Share;
