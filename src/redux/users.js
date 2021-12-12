const SET_USERS = "SET_USERS";

const INITIAL_STATE = [];

export const setUsers = (users) => {
  return {
    type: SET_USERS,
    payload: users,
  };
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USERS:
      return action.payload;
    default:
      return state;
  }
};
