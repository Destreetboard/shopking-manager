// ** Reducers Imports
import navbar from "./navbar";
import layout from "./layout";
import auth from "./authentication";
import categories from "./categories";
import locations from "./locations";
import orders from "./orders";
import users from "./users";
import vendors from "./vendors";

import dataTables from "@src/views/tables/data-tables/store";

const rootReducer = {
  auth,
  categories,
  locations,
  orders,
  users,
  vendors,
  navbar,
  layout,
  dataTables,
};

export default rootReducer;
