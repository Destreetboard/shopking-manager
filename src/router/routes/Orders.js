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
    exact: true,
  },
  {
    path: "/dashboard/orders/cancelled",
    component: lazy(() => import("../../pages/orders/cancelled")),
    exact: true,
  },
  {
    path: "/dashboard/orders/:id",
    className: "ecommerce-application",
    component: lazy(() => import("../../pages/orders/detail")),
    exact: true,
  },
];

export default UsersRotues;
