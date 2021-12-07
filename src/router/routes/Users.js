import { lazy } from "react";

const UsersRotues = [
  {
    path: "/dashboard/users",
    component: lazy(() => import("../../pages/users/list")),
  },
  {
    path: "/dashboard/users/:id",
    component: lazy(() => import("../../pages/users/view")),
  },
];

export default UsersRotues;
