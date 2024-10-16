// src/pages/Home.js
import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="container">
      <h1 className="heading">Welcome to the Pet Adoption App</h1>
      <p className="paragraph">Find your perfect companion today.</p>
      <img 
      src="https://i.pinimg.com/236x/76/2d/84/762d848e42ffd9a02a448c1184b5d9ea.jpg"/>
      <button className="button">Start Your Search</button>
    </div>
  );
};

export default Home;
