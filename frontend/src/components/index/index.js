import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, useParams } from "react-router-dom";
import "./index.css";
const Home = () => {
  return (
    <>
      <div className="image1"></div>
      <button className="imageBtn">
        <NavLink to="">I'm Flexible</NavLink>
      </button>
      <h2 className="text">Inspiration for your next trip</h2>
      <div className="container">
        <div className="flexible"></div>
        <div className="flexible"></div>
        <div className="flexible"></div>
        <div className="flexible"></div>
      </div>
    </>
  );
};

export default Home;
