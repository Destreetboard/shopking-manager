const SET_VENDORS = "SET_VENDORS";

const INITIAL_STATE = [];

export const setVendors = (vendors) => {
  return {
    type: SET_VENDORS,
    payload: vendors,
  };
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_VENDORS:
      return action.payload;
    default:
      return state;
  }
};
