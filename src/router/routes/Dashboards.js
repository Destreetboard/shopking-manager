import { lazy } from "react";

const DashboardRoutes = [
  {
    path: "/dashboard",
    component: lazy(() => import("../../views/dashboard/ecommerce")),
    exact: true,
  },
];

export default DashboardRoutes;
