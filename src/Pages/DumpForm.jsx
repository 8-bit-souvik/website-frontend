import React, { useState } from "react";
import { addDoc } from "firebase/firestore";
import { ideaRef } from "../firebase";

const DumpForm = () => {
  const [formData, setformData] = useState({ name: "", email: "", description: "" });

  const handleChange = (e) => {
    setformData((prevState) => ({...prevState, [e.target.name]: e.target.value, }));
  };

  const submitIdea = (e) => {
    e.preventDefault();

    addDoc(ideaRef, {
      name:formData.name,
      email:formData.email,
      description:formData.description,
    }).then(() => {
      setformData({ name: "", email: "", description: "" });
      alert("Idea Submitted")
    });
  };

  return (
    <>
      <div className="dump_form">
        <form>
          <label htmlFor="name">Idea Name:</label>
          <input type="text" name="name" onChange={handleChange} required />
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" onChange={handleChange} required />
          <label htmlFor="description">Idea Description:</label>
          <textarea
            type="text"
            name="description"
            onChange={handleChange}
            required
          />
          <button type="submit" onClick={submitIdea}>
            submit idea
          </button>
        </form>
      </div>
    </>
  );
};

export default DumpForm;
