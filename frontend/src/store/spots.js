import { csrfFetch } from "./csrf";

const SET_SPOT = "spots/setSpot";
const REMOVE_SPOT = "spots/removeSpot";

const setSpot = (spot) => {
  return {
    type: SET_SPOT,
    payload: spot,
  };
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

const spotReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case SET_SPOT:
      newState = Object.assign({}, state);
      newState.spot = action.payload;
      return newState;
    case REMOVE_SPOT:
      return {};
    default:
      return state;
  }
};

export default spotReducer;
