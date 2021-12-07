import { lazy } from "react";

const MiscRoutes = [
  {
    path: "/coming-soon",
    component: lazy(() => import("../../pages/misc/ComingSoon")),
    layout: "BlankLayout",
    meta: {
      publicRoute: true,
    },
  },
  {
    path: "/not-authorized",
    component: lazy(() => import("../../pages/misc/NotAuthorized")),
    layout: "BlankLayout",
    meta: {
      publicRoute: true,
    },
  },
  {
    path: "/maintenance",
    component: lazy(() => import("../../pages/misc/Maintenance")),
    layout: "BlankLayout",
    meta: {
      publicRoute: true,
    },
  },
  {
    path: "/error",
    component: lazy(() => import("../../pages/misc/Error")),
    layout: "BlankLayout",
    meta: {
      publicRoute: true,
    },
  },
];

export default MiscRoutes;
