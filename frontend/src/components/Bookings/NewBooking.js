import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getOneSpot } from "../../store/spots";

import { createBooking } from "../../store/bookings";
import S3FileUpload from "react-s3";
import LoadingScreen from "../viewOneSpot/Loading";

const NewBookingForm = ({ spot }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const { id } = useParams();

  // console.log(spot.SpotBookings);

  var getDaysArray = function (start, end) {
    for (
      var arr = [], dt = new Date(start);
      dt <= new Date(end);
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt));
    }
    return arr;
  };

  for (let i = 0; i < spot.SpotBookings?.length; i++) {
    const booking = spot.SpotBookings[i];
    let startDate = booking.startDate;
    let endDate = booking.endDate;
    var bookedDays = getDaysArray(startDate, endDate);
    // console.log(bookedDays);
  }

  const startDate1 = () => {
    let now = new Date();
    let month = now.getMonth() + 1;
    if (month < 10) {
      month = "0" + month.toString();
    }
    let day = now.getDate();
    if (day < 10) {
      day = "0" + day.toString();
    }
    let year = now.getFullYear();
    let start = `${year}-${month}-${day}`;
    return start;
  };

  const today = new Date().toDateString();

  const [startDate, setStartDate] = useState("2022-04-15");
  const [endDate, setEndDate] = useState("2022-04-15");

  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const newPrice = parseInt(spot.price);

  const startArr = startDate.split("-");
  const startYear = startArr[0];
  const startMonth = startArr[1];
  const startDay = startArr[2];

  const endArr = endDate.split("-");
  const endYear = endArr[0];
  const endMonth = endArr[1];
  const endDay = endArr[2];

  const todayVal = new Date();
  const todayInMs = todayVal.getTime();

  const date1 = new Date(+startYear, +startMonth - 1, +startDay);

  // creating the date 2 with sample input date.
  const date2 = new Date(+endYear, +endMonth - 1, +endDay);

  // const newDays = getDaysArray(date1, date2);
  // console.log(newDays);

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
    if (date1InMs > date2InMs) {
      errors.push("Start Date must be before End Date");
    }

    for (let i = 0; i < bookedDays?.length; i++) {
      let bookedDay = bookedDays[i];

      const valDate = bookedDay.getTime();

      // console.log(date1InMs);
      if (date1InMs === valDate) {
        errors.push("This date is already booked");
      }

      if (date2InMs === valDate) {
        errors.push("This date is already booked");
      }
    }

    setValidationErrors(errors);
  }, [startDate, endDate, newPrice]);

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

  if (!sessionUser) return null;
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
            min={startDate1()}
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
        <button
          disabled={validationErrors.length > 0}
          className={`button btn-gradient`}
          type="submit"
        >
          Book Now
        </button>
      </form>
      {date2InMs > date1InMs && <h2>Total Price$ {totalPrice}</h2>}
    </div>
  );
};

export default NewBookingForm;
