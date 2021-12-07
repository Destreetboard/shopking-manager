import { lazy } from "react";

const UsersRotues = [
  {
    path: "/dashboard/orders",
    component: lazy(() => import("../../pages/orders")),
    exact: true,
  },
  {
    path: "/dashboard/orders/pending",
    component: lazy(() => import("../../pages/orders/pending")),
    exact: true,
  },
  {
    path: "/dashboard/orders/completed",
    component: lazy(() => import("../../pages/orders/completed")),
  },
  {
    path: "/dashboard/orders/declined",
    component: lazy(() => import("../../pages/orders/declined")),
  },
  {
    path: "/dashboard/orders/:id",
    component: lazy(() => import("../../pages/orders/detail")),
  },
];

export default UsersRotues;
