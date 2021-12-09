const SET_LOCATIONS = "SET_LOCATIONS";

const INITIAL_STATE = [];

export const setLocations = (categories) => {
  return {
    type: SET_LOCATIONS,
    payload: categories,
  };
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LOCATIONS:
      return action.payload;
    default:
      return state;
  }
};
