import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, useParams } from "react-router-dom";
import { getOneSpot } from "../../store/spots";
import EditSpotForm from "../EditSpot";
import "./OneSpot.css";
const SpotDetail = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots);

  const { id } = useParams();
  const spot = spots[id];
  console.log(spot);
  if (!spot) return null;
  return (
    <div className="spotCont">
      <div id="images">
        {spot.Pictures.map((pic) => (
          <img id={`image${pic.id}`} src={pic.image} alt="spot" key={pic.id} />
        ))}
        <div id="slider">
          {spot.Pictures.map((pic) => (
            <a key={pic.id} href={`#image${pic.id}`}>
              {pic.id}
            </a>
          ))}
        </div>
      </div>
      <div className="spot-info">
        <h3>{spot.name}</h3>
        <p>{spot.description}</p>
        <p>${spot.price} per night</p>
        <p>{spot.location}</p>
      </div>
    </div>
  );
};
export default SpotDetail;
