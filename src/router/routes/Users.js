import { lazy } from "react";

const UsersRotues = [
  {
    path: "/dashboard/users",
    component: lazy(() => import("../../pages/users")),
    exact: true,
  },
  {
    path: "/dashboard/users/:id",
    component: lazy(() => import("../../pages/users/view")),
    exact: true,
  },
];

export default UsersRotues;
