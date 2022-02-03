import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dumpform.css";
import { addDoc } from "firebase/firestore";
import { ideaRef } from "../firebase";

const DumpForm = () => {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    description: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setformData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitIdea = (e) => {
    e.preventDefault();

    if (formData.name && formData.email && formData.description) {
      addDoc(ideaRef, {
        name: formData.name,
        email: formData.email,
        description: formData.description,
      }).then(() => {
        setformData({ name: "", email: "", description: "" });
        alert("Idea Submitted");
        navigate("/");
      });
    }
  };

  return (
    <>
      <div className="dump_form">
        <Link to="/">
          <button className="cancel__form">X</button>
        </Link>
        <div className="form__heading">
          <h1 id="greeting__msg">Hi There &#128075;</h1>
          <p id="form__msg">
            Feel free to share your ideas and community will help you to turn it
            into a product.
          </p>
        </div>
        <form className="form__container">
          <label htmlFor="name" className="input__lables">
            Enter your full name:<span className="asteriks">*</span>
          </label>
          <input
            className="input__field"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="off"
          />
          <label htmlFor="email" className="input__lables">
            Enter email address:<span className="asteriks">*</span>
          </label>
          <input
            className="input__field"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="off"
          />
          <label htmlFor="description" className="input__lables">
            Brief Description of idea:<span className="asteriks">*</span>
          </label>
          <textarea
            className="input__field text__area"
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            autoComplete="off"
          />
          <label htmlFor="dropzone" className="input__lables">
            Please share Graphical Description (If any)
          </label>
          <div
            className="input__field drop__zone"
            title="Drop Your Graphical Description Here"
          >
            <img src={""} alt="" className="upload__img" />
          </div>
          <button
            title="Click to Submit Your Idea"
            id="submit__button"
            type="submit"
            onClick={submitIdea}
          >
            submit idea
          </button>
        </form>
      </div>
    </>
  );
};

export default DumpForm;
