import { lazy } from "react";

const LocationsRoutes = [
  {
    path: "/dashboard/locations",
    component: lazy(() => import("../../pages/locations")),
    exact: true,
  },
  {
    path: "/dashboard/sub-locations",
    component: lazy(() => import("../../pages/locations/sublocations")),
    exact: true,
  },
  {
    path: "/dashboard/locations/sub-locations",
    component: lazy(() => import("../../pages/locations/detail")),
  },
];

export default LocationsRoutes;
