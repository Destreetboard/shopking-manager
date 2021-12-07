// ** Navigation imports
// import apps from "./apps";
// import pages from "./pages";
// import forms from "./forms";
// import tables from "./tables";
// import others from "./others";
// import charts from "./charts";
// import uiElements from "./ui-elements";

import dashboards from "./dashboards";
import orders from "./orders";
import users from "./users";
import locations from "./locations";
import categories from "./categories";
import vendors from "./vendors";
import settings from "./settings";

// ** Merge & Export
export default [
  ...dashboards,
  ...orders,
  ...users,
  ...locations,
  ...categories,
  ...vendors,
  ...settings,
  // ...apps,
  // ...pages,
  // ...uiElements,
  // ...forms,
  // ...tables,
  // ...charts,
  // ...others,
];
