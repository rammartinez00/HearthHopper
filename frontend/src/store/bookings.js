import { csrfFetch } from "./csrf";

const SET_BOOKING = "bookings/setBooking";
const EDIT_BOOKING = "bookings/editBooking";
const DELETE_BOOKING = "bookings/deleteBooking";
const LOAD_ALL = "bookings/loadAll";

const setBooking = (booking) => {
  return {
    type: SET_BOOKING,
    payload: booking,
  };
};

const editBooking = (booking) => {
  return {
    type: EDIT_BOOKING,
    payload: booking,
  };
};

const deleteBooking = (id) => {
  return {
    type: DELETE_BOOKING,
    payload: id,
  };
};

const loadAllbookings = (bookings) => {
  return {
    type: LOAD_ALL,
    payload: bookings,
  };
};

export const getBookings = () => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings`);
  const data = await response.json();
  dispatch(loadAllbookings(data));
  return response;
};

export const createBooking = (booking) => async (dispatch) => {
  const response = await csrfFetch("/api/bookings/new", {
    method: "POST",
    body: JSON.stringify(booking),
  });
  const data = await response.json();
  dispatch(setBooking(data));
  return response;
};

export const updateBooking = (booking) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${booking.id}`, {
    method: "PATCH",
    body: JSON.stringify(booking),
  });
  const data = await response.json();
  dispatch(editBooking(data));
  return response;
};

export const removeBooking = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${id}`, {
    method: "DELETE",
  });
  dispatch(deleteBooking(id));
  return response;
};

const bookingReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_ALL:
      return action.payload;
    case SET_BOOKING:
      return [...state, action.payload];
    case EDIT_BOOKING:
      return state.map((booking) => {
        if (booking.id === action.payload.id) {
          return action.payload;
        } else {
          return booking;
        }
      });
    case DELETE_BOOKING:
      return state.filter((booking) => booking.id !== action.payload);
    default:
      return state;
  }
};

export default bookingReducer;
