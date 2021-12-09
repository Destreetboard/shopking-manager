const SET_ORDERS = "SET_ORDERS";

const INITIAL_STATE = [];

export const setOrders = (orders) => {
  return {
    type: SET_ORDERS,
    payload: orders,
  };
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return action.payload;
    default:
      return state;
  }
};
