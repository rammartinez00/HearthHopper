import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, useParams, useHistory } from "react-router-dom";
import { getOneSpot, deleteOneSpot } from "../../store/spots";
import NewBookingForm from "../Bookings/NewBooking";
import EditSpotForm from "../EditSpot";
import LoadingScreen from "./Loading";
import "./OneSpot.css";
const SpotDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const spots = useSelector((state) => state.spots);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const spot = spots[id];
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    setIsLoading(false);
  }, []);
  if (!spot) return null;

  return (
    <>
      {isLoading === false ? (
        <div className="spotCont">
          <div id="images">
            {spot.Pictures.map((pic) => (
              <img
                id={`image${pic.id}`}
                src={pic.image}
                alt="spot"
                key={pic.id}
              />
            ))}
            <div id="slider">
              {spot.Pictures.map((pic, index) => (
                <a key={pic.id} href={`#image${pic.id}`}>
                  {index + 1}
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
          <NewBookingForm spot={spot} />
          {sessionUser.id === spot?.userId && (
            <div className="ownerControls">
              <button>
                <NavLink to={`/spots/${spot?.id}/edit`}>Edit</NavLink>
              </button>
              <button
                onClick={() => {
                  dispatch(deleteOneSpot(spot?.id));
                  history.push("/spots");
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default SpotDetail;
