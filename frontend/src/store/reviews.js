import { csrfFetch } from "./csrf";

const SET_REVIEW = "reviews/setReview";
const EDIT_REVIEW = "reviews/editReview";
const DELETE_REVIEW = "reviews/deleteReview";
const LOAD = "reviews/load";

const setReview = (review) => {
  return {
    type: SET_REVIEW,
    payload: review,
  };
};

const editReview = (review) => {
  return {
    type: EDIT_REVIEW,
    payload: review,
  };
};

const deleteReview = (id) => {
  return {
    type: DELETE_REVIEW,
    payload: id,
  };
};

const load = (reviews) => {
  return {
    type: LOAD,
    payload: reviews,
  };
};

export const getReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  const data = await response.json();
  dispatch(load(data.reviews));
  return response;
};

export const postReview = (review) => async (dispatch) => {
  const response = await csrfFetch("/api/reviews/new", {
    method: "POST",
    body: JSON.stringify(review),
  });
  const data = await response.json();
  dispatch(setReview(data));
  return response;
};

export const patchReview = (review) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${review.id}`, {
    method: "PATCH",
    body: JSON.stringify(review),
  });
  const data = await response.json();
  dispatch(editReview(data));
  return response;
};

export const removeReview = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${id}`, {
    method: "DELETE",
  });
  dispatch(deleteReview(id));
  return response;
};

const reviewReducer = (state = [], action) => {
  let newState;
  switch (action.type) {
    case LOAD:
      const allReviews = {};
      action.payload.forEach((review) => {
        allReviews[review.id] = review;
      });
      return allReviews;
    case SET_REVIEW:
      newState = Object.assign({}, state);
      newState[action.payload.id] = action.payload;
      return newState;
    case EDIT_REVIEW:
      newState = Object.assign({}, state);
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE_REVIEW:
      newState = Object.assign({}, state);
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
};
export default reviewReducer;
