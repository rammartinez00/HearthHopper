import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, useParams } from "react-router-dom";
import { getSpots } from "../../store/spots";
import "./AllSpots.css";
const SpotBrowser = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots);
  const spotsArr = Object.values(spots);
  const sessionUser = useSelector((state) => state.session.user);

  let editLinks = (
    <>
      <button>Edit</button>
      <button>Delete</button>
    </>
  );

  if (!spots) return null;
  return (
    <div className="spotContainer">
      {spotsArr.map((spot) => (
        <div className="spot" key={spot.id}>
          <div className="spot-image">
            {spot.Pictures.map((picture) => (
              <img src={picture.image} alt="spot" key={picture.id} />
            ))}
          </div>
          <div className="spot-info">
            <h3>{spot.name}</h3>
            <p>{spot.description}</p>
            <p>${spot.price} per night</p>
            <p>{spot.location}</p>
          </div>
          {sessionUser.id === spot.userId && editLinks}
        </div>
      ))}
    </div>
  );
};
export default SpotBrowser;
