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

  const today = new Date().toDateString();
  console.log(today, "***********");

  const [startDate, setStartDate] = useState("2022-04-15");
  const [endDate, setEndDate] = useState("2022-04-15");

  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  console.log(startDate, endDate, "^^^^^^^^^^^^");
  const newPrice = parseInt(spot.price);

  const startArr = startDate.split("-");
  const startYear = startArr[0];
  const startMonth = startArr[1];
  const startDay = startArr[2];

  const endArr = endDate.split("-");
  const endYear = endArr[0];
  const endMonth = endArr[1];
  const endDay = endArr[2];

  const date1 = new Date(+startYear, +startMonth, +startDay);

  // creating the date 2 with sample input date.
  const date2 = new Date(+endYear, +endMonth, +endDay);

  // getting milliseconds for both dates
  const date1InMs = date1.getTime();
  const date2InMs = date2.getTime();

  // getting the diff between two dates.
  let timeDiff = 0;
  if (date1InMs > date2InMs) {
    timeDiff = date1InMs - date2InMs;
  } else {
    timeDiff = date2InMs - date1InMs;
  }

  // converting diff into days
  const daysDiff = timeDiff / (1000 * 60 * 60 * 24);

  const totalPrice = daysDiff * newPrice;

  useEffect(() => {
    const errors = [];
    if (startDate.length < 1) {
      errors.push("Start Date is required");
    }
    if (endDate.length < 1) {
      errors.push("End Date is required");
    }
    if (daysDiff < 0) {
      errors.push("End Date must be after Start Date");
    }
    setValidationErrors(errors);
  }, [startDate, endDate, daysDiff]);

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
      <h2>Total Price$ {totalPrice}</h2>
    </div>
  );
};

export default NewBookingForm;
