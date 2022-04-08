import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { postReview } from "../../store/reviews";

const NewReview = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const { id } = useParams();
  const spots = useSelector((state) => state.spots);
  const spot = spots[id];

  const dispatch = useDispatch();
  const history = useHistory();

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errors = [];
    if (comment.length < 1) {
      errors.push("Review is required");
    }
    if (rating.length < 1) {
      errors.push("Rating is required");
    }
    setValidationErrors(errors);
  }, [comment, rating]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    const review = {
      comment,
      rating,
      userId: sessionUser.id,
      spotId: spot.id,
    };

    let createdReview;

    createdReview = await dispatch(postReview(review));
    setComment("");
    setRating("");
    setHasSubmitted(false);
    setValidationErrors([]);

    history.push(`/spots/${spot.id}`);
  };

  return (
    <div className="ReviewCont">
      <form onSubmit={handleSubmit}>
        <h2>Leave a Review!</h2>
        <ul className="errors">
          {validationErrors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        <div className="ReviewCont__form">
          <div className="ReviewCont__form__rating">
            <label htmlFor="rating">Rating</label>
            <select
              name="rating"
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="ReviewCont__form__comment">
            <label htmlFor="comment">Comment</label>
            <textarea
              name="comment"
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className="ReviewCont__form__submit">
            <button type="submit" disabled={validationErrors.length > 0}>
              Post The Review
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewReview;
