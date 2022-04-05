import { csrfFetch } from "./csrf";

const LOAD = "spot/LOAD";
const SET_SPOT = "spots/setSpot";
const UPDATE_SPOT = "spot/UPDATE_SPOT";
const REMOVE_SPOT = "spots/removeSpot";

const load = (spots) => {
  return {
    type: LOAD,
    payload: spots,
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

export const getSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    dispatch(load(data));
  }
};

export const createSpot = (spot) => async (dispatch) => {
  const response = await csrfFetch("/api/spots/new", {
    method: "POST",
    body: JSON.stringify(spot),
  });
  const data = await response.json();
  dispatch(setSpot(data.spot));
  return response;
};

export const updateSpot = (spot) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spot.id}/edit`, {
    method: "PUT",
    body: JSON.stringify(spot),
  });
  const data = await response.json();
  dispatch(updateOne(data.spot));
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
    case SET_SPOT:
      newState = Object.assign({}, state);
      newState.spot = action.payload;
      return newState;
    case UPDATE_SPOT:
      newState = Object.assign({}, state);
      newState[action.payload.id] = action.payload;
      return newState;
    case REMOVE_SPOT:
      return {};
    default:
      return state;
  }
};

export default spotReducer;
