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

const Share = () => {
  const data = {
    title: "DEZENIX",
    url: "https://dezenix.com",
  };

  return (
    <>
      <div className='social__media'>
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
