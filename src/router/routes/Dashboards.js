import { lazy } from "react";

const DashboardRoutes = [
  {
    path: "/dashboard",
    component: lazy(() => import("../../pages/dashboard")),
    exact: true,
  },
];

export default DashboardRoutes;
