import React from 'react';
import Navbar from '../Components/dumpwall/Navbar';
import Hero from '../Components/dumpwall/Hero';
import IdeaList from '../Components/dumpwall/IdeaList';
import Footer from '../Components/dumpwall/Footer';

const Dumpwall = () => (
  <div className="body__bg">
    <Navbar />
    <Hero />
    <IdeaList />
    <Footer />
  </div>
);

export default Dumpwall;
