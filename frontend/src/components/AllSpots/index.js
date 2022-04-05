import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, useParams } from "react-router-dom";
import { getSpots } from "../../store/spots";
import EditSpotForm from "../EditSpot";
import "./AllSpots.css";
const SpotBrowser = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots);
  const spotsArr = Object.values(spots);
  const sessionUser = useSelector((state) => state.session.user);

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
          {sessionUser.id === spot.userId && (
            <div>
              <EditSpotForm spot={spot} />
              <button>
                <NavLink to={`/spots/${spot.id}/edit`}>Edit</NavLink>
              </button>
              <button>
                <NavLink to={`/spots/${spot.id}/delete`}>Delete</NavLink>
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default SpotBrowser;
