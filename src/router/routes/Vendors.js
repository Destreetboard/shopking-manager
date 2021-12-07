import { lazy } from "react";

const VendorsRoutes = [
  {
    path: "/dashboard/vendors",
    component: lazy(() => import("../../pages/vendors")),
    exact: true,
  },
];

export default VendorsRoutes;
