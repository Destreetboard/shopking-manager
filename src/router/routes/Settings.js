import { lazy } from "react";

const SettingsRoutes = [
  {
    path: "/dashboard/settings",
    component: lazy(() => import("../../pages/settings")),
    exact: true,
  },
];

export default SettingsRoutes;
