import React from "react";
import "./Section.css";
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
import images from "../../../assets/images.jsx";

const Share = ({ name, description, closeModal }) => {
  const data = {
    title:
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
  };

  console.log(name);

  return (
    <>
      <div className="social__media">
        <WhatsappShareButton
          url={data.url}
          title={data.title}
          className="share__icons"
        >
          <WhatsappIcon size={50} round={true} />
        </WhatsappShareButton>
        <TwitterShareButton
          url={data.url}
          title={data.title}
          className="share__icons"
        >
          <TwitterIcon
            size={50}
            round={true}
            onClick={() => closeModal(false)}
          />
        </TwitterShareButton>
        <RedditShareButton
          url={data.url}
          title={data.title}
          className="share__icons"
        >
          <RedditIcon
            size={50}
            round={true}
            onClick={() => closeModal(false)}
          />
        </RedditShareButton>
        <LinkedinShareButton
          url={data.url}
          title={data.title}
          className="share__icons"
        >
          <LinkedinIcon
            size={50}
            round={true}
            onClick={() => closeModal(false)}
          />
        </LinkedinShareButton>
        <FacebookShareButton
          url={data.url}
          title={data.title}
          className="share__icons"
        >
          <FacebookIcon
            size={50}
            round={true}
            onClick={() => closeModal(false)}
          />
        </FacebookShareButton>
      </div>
    </>
  );
};

export default Share;
