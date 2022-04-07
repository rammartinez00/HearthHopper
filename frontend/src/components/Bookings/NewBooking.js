import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { createBooking } from "../../store/bookings";
import S3FileUpload from "react-s3";
import LoadingScreen from "../viewOneSpot/Loading";

const NewBookingForm = ({ spot }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const { id } = useParams();
  console.log(id);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errors = [];
    if (startDate.length < 1) {
      errors.push("Start Date is required");
    }
    if (endDate.length < 1) {
      errors.push("End Date is required");
    }
    setValidationErrors(errors);
  }, [startDate, endDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    const booking = {
      startDate,
      endDate,
      spotId: id,
      userId: sessionUser.id,
    };

    let createdBooking;

    createdBooking = await dispatch(createBooking(booking));

    setStartDate("");
    setEndDate("");
    setHasSubmitted(false);
    setValidationErrors([]);

    history.push(`/spots/${id}`);
  };

  return (
    <div className="bookingCont">
      <form onSubmit={handleSubmit}>
        <h2>Book Here!</h2>
        <ul className="errors">
          {validationErrors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        <div>
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button type="submit">Book Now</button>
      </form>
      <h2>Total Price$ {spot}</h2>
    </div>
  );
};

export default NewBookingForm;
