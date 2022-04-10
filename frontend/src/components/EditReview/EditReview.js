import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// import { patch } from "../../../../backend/routes/api/spots";
import { patchReview } from "../../store/reviews";
import { getOneSpot } from "../../store/spots";
const ChangeReview = ({ review }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const { id } = useParams();
  const spots = useSelector((state) => state.spots);
  const spot = spots[id];

  const dispatch = useDispatch();
  const history = useHistory();

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    dispatch(getOneSpot(id));
  }, [hasSubmitted]);

  useEffect(() => {
    const errors = [];
    if (comment.length < 1) {
      errors.push("Review is required");
    }
    if (rating.length < 0) {
      errors.push("Rating is required");
    }
    setValidationErrors(errors);
  }, [comment, rating]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    const editedReview = {
      id: review.id,
      rating,
      comment,
    };

    let createdReview;

    createdReview = await dispatch(patchReview(editedReview));

    setComment("");
    setRating("");
    setHasSubmitted(false);
    setValidationErrors([]);

    history.push(`/spots/${spot.id}`);
  };

  return (
    <div className="ReviewCont">
      <form onSubmit={handleSubmit}>
        <h2>Edit Your Review!</h2>
        <ul className="errors">
          {validationErrors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        <div className="ReviewCont__form">
          <label htmlFor="comment">
            <textarea
              id="comment"
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </label>
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
        <div className="ReviewCont__form__submit">
          <button
            className={`button btn-gradient`}
            disabled={validationErrors.length > 0}
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default ChangeReview;
