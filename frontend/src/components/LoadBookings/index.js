import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, useParams } from "react-router-dom";
import { getBookings } from "../../store/bookings";
import "./index.css";

const LoadAllBookings = () => {
  const dispatch = useDispatch();

  const bookings = useSelector((state) => state.bookings);
  const sessionUser = useSelector((state) => state.session.user);

  const userBookings = bookings.filter(
    (booking) => booking.userId === sessionUser?.id
  );

  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);

  if (!userBookings) return <h2>You have no bookings</h2>;
  return (
    <>
      {!userBookings.length ? (
        <h2>You have no bookings</h2>
      ) : (
        <div className="bookingContainer">
          <>
            <h2>Your Bookings</h2>
            <div className="bookings">
              <div className="booking-list">
                <ul>
                  {bookings.map((booking) => (
                    <div key={booking.id}>
                      <>
                        {sessionUser.id === booking.userId ? (
                          <li key={booking.id}>
                            <div className="booking-info">
                              <div className="booking-info-left">
                                <h3>{booking.Spot.name}</h3>
                                <p className="desc">
                                  {booking.Spot.description}
                                </p>
                                <p>${booking.Spot.price} per night</p>
                              </div>
                              <div className="booking-info-right">
                                {/* <p>
                                  <span>
                                    <i className="fas fa-user"></i>
                                  </span>
                                  {booking.User.username}
                                </p> */}
                                <p>
                                  <span>
                                    <i className="fas fa-calendar-alt"></i>
                                  </span>
                                  {booking.startDate} - {booking.endDate}
                                </p>
                                <p>${booking.totalPrice}</p>
                              </div>
                            </div>
                          </li>
                        ) : null}
                      </>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </>
        </div>
      )}
    </>
  );
};

export default LoadAllBookings;
