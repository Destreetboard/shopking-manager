import { lazy } from "react";

const LocationsRoutes = [
  {
    path: "/dashboard/locations",
    component: lazy(() => import("../../pages/locations")),
    exact: true,
  },
  {
    path: "/dashboard/locations/:id/sub-locations",
    component: lazy(() => import("../../pages/locations/detail")),
    exact: true,
  },
];

export default LocationsRoutes;
