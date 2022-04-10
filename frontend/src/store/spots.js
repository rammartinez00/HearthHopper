import { csrfFetch } from "./csrf";

const LOAD = "spot/LOAD";
const LOAD_ONE = "spot/LOAD_ONE";
const SET_SPOT = "spots/setSpot";
const UPDATE_SPOT = "spot/UPDATE_SPOT";
const REMOVE_SPOT = "spots/removeSpot";

const load = (spots) => {
  return {
    type: LOAD,
    payload: spots,
  };
};

const loadOne = (spot) => {
  return {
    type: LOAD_ONE,
    payload: spot,
  };
};

const setSpot = (spot) => {
  return {
    type: SET_SPOT,
    payload: spot,
  };
};

const updateOne = (spot) => {
  return {
    type: UPDATE_SPOT,
    payload: spot,
  };
};

const deleteSpot = (id) => {
  return {
    type: REMOVE_SPOT,
    payload: id,
  };
};

export const getSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  if (response.ok) {
    const data = await response.json();

    dispatch(load(data));
  }
};

export const getOneSpot = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}`);
  if (response.ok) {
    const data = await response.json();
    // console.log(data);
    dispatch(loadOne(data));
  }
};

export const createSpot = (spot) => async (dispatch) => {
  const response = await csrfFetch("/api/spots/new", {
    method: "POST",
    body: JSON.stringify(spot),
  });
  const data = await response.json();
  dispatch(setSpot(data));
  return data;
};

export const updateSpot = (spot) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spot.id}/edit`, {
    method: "PUT",
    body: JSON.stringify(spot),
  });
  const data = await response.json();

  dispatch(updateOne(data));
  return response;
};

export const deleteOneSpot = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}/delete`, {
    method: "DELETE",
  });
  dispatch(deleteSpot(id));
  return response;
};

const spotReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case LOAD:
      const allSpots = {};
      action.payload.forEach((spots) => {
        allSpots[spots.id] = spots;
      });
      return { ...state, ...allSpots };
    case LOAD_ONE:
      return { ...state, [action.payload.id]: action.payload };
    case SET_SPOT:
      return { ...state, [action.payload.id]: action.payload };
    case UPDATE_SPOT:
      newState = Object.assign({}, state);
      newState[action.payload.id] = action.payload;
      return newState;
    case REMOVE_SPOT:
      newState = Object.assign({}, state);
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
};

export default spotReducer;
