import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, useParams } from "react-router-dom";
import "./index.css";
const Home = () => {
  const spots = useSelector((state) => state.spots);
  const spotsArr = Object.values(spots);
  // console.log(spots);
  const randomSpot = function (spots) {
    //return a random spot
    const randomIndex = Math.floor(Math.random() * spotsArr.length);
    // console.log(randomIndex);
    return spotsArr[randomIndex];
  };
  // console.log(Math.ceil(Math.random() * spotsArr.length), "*************");

  const ranArr = [];
  for (let i = 0; i < 3; i++) {
    const ranSpot = randomSpot(spots);
    ranArr.push(ranSpot);
  }
  // console.log(ranSpot, "^^^^^^^^^^^");

  return (
    <>
      <div className="image1"></div>
      <button className={`button btn-gradient imageBtn`}>
        <NavLink className="flexButton" to="/spots">
          I'm Flexible
        </NavLink>
      </button>
      <h2 className="text">Inspiration for your next trip</h2>
      <div className="container">
        {ranArr.map((spot, i) => (
          <div className="spot" key={i}>
            <div className="spot-image" key={i}>
              <NavLink className="spot-image" to={`/spots/${spot?.id}`}>
                <img
                  src={spot?.Pictures[0]?.image}
                  alt="spot"
                  key={spot?.Pictures[0]?.id}
                />
              </NavLink>
            </div>
            <div className="spot-info">
              <h3>{spot?.name}</h3>
              <p>{spot?.description}</p>
              <p>${spot?.price} per night</p>
              <p>{spot?.location}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
