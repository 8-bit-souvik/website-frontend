import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './DumpForm.css';
import { addDoc, serverTimestamp } from 'firebase/firestore';
import { ideaRef } from '../firebase';
import moment from 'moment';
import { storage } from '../firebase';
import { ref as storageRef, uploadBytes } from 'firebase/storage';

let fileToBeUploaded;

const DumpForm = () => {
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    name: '',
    email: '',
    description: '',
    imageURL: '',
  });

  const handleChange = (e) => {
    setformData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log(moment().format('DD MMMM YYYY'));
  };

  const submitIdea = async (e) => {
    e.preventDefault();
    const { name, email, description, imageURL } = formData;

    if (name && email && description) {
      const newRef = await addDoc(ideaRef, {
        name: name,
        email: email,
        description: description,
        votes: 0,
        date: moment().format('DD MMMM YYYY'),
        imageURL: imageURL ? imageURL : '',
        timestamp: serverTimestamp(),
      });

      const newID = newRef.id;

      const fileRef = storageRef(storage, `ideaForm/${newID}/desc-1-${fileToBeUploaded.name}`);

      const result = await uploadBytes(fileRef, fileToBeUploaded);

      setformData({ name: '', email: '', description: '' });
      alert('Idea Submitted');
      navigate('/');
    }
  };

  const onImageDropped = (event, id) => {
    event.preventDefault();
    fileToBeUploaded = event.dataTransfer.files[0];

    console.log(fileToBeUploaded);
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
            Feel free to share your ideas and the community will help you to turn it into a product.
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
            draggable
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDrop={(event) => onImageDropped(event)}
            className="input__field drop__zone"
            title="Drop Your Graphical Description Here"
          >
            <img src={''} alt="" className="upload__img" />
          </div>
          <label htmlFor="imageURL" className="input__lables">
            Please share any Relavent Link ( Figma, etc )<span className="asteriks">*</span>
          </label>
          <input
            className="input__field"
            type="URL"
            id="imageURL"
            name="imageURL"
            value={formData.imageURL}
            onChange={handleChange}
            autoComplete="off"
          />
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
