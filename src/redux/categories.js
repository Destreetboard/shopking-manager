const SET_CATEGORIES = "SET_CATEGORIES";

const INITIAL_STATE = [];

export const setCategories = (categories) => {
  return {
    type: SET_CATEGORIES,
    payload: categories,
  };
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.payload;
    default:
      return state;
  }
};
