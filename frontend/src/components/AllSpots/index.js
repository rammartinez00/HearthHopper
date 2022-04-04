import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, useParams } from "react-router-dom";
import { getSpots } from "../../store/spots";
const SpotBrowser = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots);
  const spotsArr = Object.values(spots);
  console.log(spots);
  //   useEffect(() => {
  //     dispatch(getSpots());
  //   }, [dispatch]);
  if (!spots) return null;
  return (
    <div>
      {spotsArr.map((spot) => (
        <div className="spot">
          <div className="spot-image">
            <img src={spot.image} alt={spot.name} />
          </div>
          <div className="spot-info">
            <h3>{spot.name}</h3>
            <p>{spot.description}</p>
            <p>${spot.price} per night</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default SpotBrowser;
