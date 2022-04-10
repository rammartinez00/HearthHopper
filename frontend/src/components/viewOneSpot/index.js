import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  NavLink,
  Route,
  useParams,
  useHistory,
  Redirect,
} from "react-router-dom";
import { getOneSpot, deleteOneSpot } from "../../store/spots";
import NewBookingForm from "../Bookings/NewBooking";
import NewReview from "../NewReviews/index";
import EditSpotForm from "../EditSpot";
import LoadingScreen from "./Loading";
import { removeReview } from "../../store/reviews";
import "./OneSpot.css";
import EditReviewModal from "../EditReview";
const SpotDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const spots = useSelector((state) => state.spots);
  const [isLoading, setIsLoading] = useState(true);
  const [hasDeleted, setHasDeleted] = useState(false);

  const { id } = useParams();
  const spot = spots[id];
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    // setIsLoading(false);
    dispatch(getOneSpot(id));
  }, [hasDeleted]);

  if (!spot) return null;

  return (
    <>
      {/* {isLoading === false ? ( */}
      <div className="spotCont">
        <div id="images" className="images">
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
          <p>Location: {spot.location}</p>
        </div>
        <NewBookingForm spot={spot} />
        <div className="reviews">
          <NewReview spot={spot} />
        </div>
        <div className="reviewList">
          {spot?.SpotReviews?.map((review) => (
            <div className="review" key={review?.id}>
              <p>Rating: {review?.rating}/5</p>
              <p>Comment: {review?.comment}</p>
              <p>{review?.User?.userName}</p>
              {sessionUser?.id === review?.userId ? (
                <div className="reviewOwnerCont">
                  <button
                    className={`button btn-gradient`}
                    onClick={async () => {
                      await dispatch(removeReview(review.id));
                      setHasDeleted(!hasDeleted);
                    }}
                  >
                    Delete
                  </button>

                  <EditReviewModal review={review} />
                </div>
              ) : null}
            </div>
          ))}
        </div>
        {sessionUser?.id === spot?.userId && (
          <div className="ownerControls">
            <button className={`button btn-gradient `}>
              <NavLink className="navEdit" to={`/spots/${spot?.id}/edit`}>
                Edit
              </NavLink>
            </button>
            <button
              className={`button btn-gradient`}
              onClick={() => {
                dispatch(deleteOneSpot(spot?.id));
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
      {/* ) : (
        <LoadingScreen />
      )} */}
    </>
  );
};

export default SpotDetail;
