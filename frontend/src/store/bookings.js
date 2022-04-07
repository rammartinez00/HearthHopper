import { csrfFetch } from "./csrf";

const SET_BOOKING = "bookings/setBooking";
const EDIT_BOOKING = "bookings/editBooking";
const DELETE_BOOKING = "bookings/deleteBooking";

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

export const createBooking = (booking) => async (dispatch) => {
  const response = await csrfFetch("/api/bookings", {
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
