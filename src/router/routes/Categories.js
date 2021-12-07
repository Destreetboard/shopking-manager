import { lazy } from "react";

const CategoriesRoutes = [
  {
    path: "/dashboard/categories",
    component: lazy(() => import("../../pages/categories")),
    exact: true,
  },
];

export default CategoriesRoutes;
