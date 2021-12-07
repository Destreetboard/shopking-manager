// ** Routes Imports
// import AppRoutes from "./Apps";
// import FormRoutes from "./Forms";
// import PagesRoutes from "./Pages";
// import TablesRoutes from "./Tables";
// import ChartsRoutes from "./Charts";
// import UiElementRoutes from "./UiElements";
// import ExtensionsRoutes from "./Extensions";
// import PageLayoutsRoutes from "./PageLayouts";

import DashboardRoutes from "./Dashboards";
import OrdersRoutes from "./Orders";
import UsersRotues from "./Users";
import LocationsRoutes from "./Locations";
import AuthenticationRoutes from "./Authentication";
import CategoriesRoutes from "./Categories";
import VendorsRoutes from "./Vendors";
import SettingsRoutes from "./Settings";
import MiscRoutes from "./Misc";

// ** Document title
const TemplateTitle = "%s - Shopking Manager";

// ** Default Route
const DefaultRoute = "/dashboard";

// ** Merge Routes
const Routes = [
  ...AuthenticationRoutes,
  ...DashboardRoutes,
  ...OrdersRoutes,
  ...UsersRotues,
  ...LocationsRoutes,
  ...CategoriesRoutes,
  ...VendorsRoutes,
  ...SettingsRoutes,
  ...MiscRoutes,
  // ...AppRoutes,
  // ...PagesRoutes,
  // ...UiElementRoutes,
  // ...ExtensionsRoutes,
  // ...PageLayoutsRoutes,
  // ...FormRoutes,
  // ...TablesRoutes,
  // ...ChartsRoutes,
];

export { DefaultRoute, TemplateTitle, Routes };
