import { lazy } from "react";

const AuthenticationRoutes = [
  {
    path: "/login",
    component: lazy(() => import("../../pages/authentication/Login")),
    exact: true,
    layout: "BlankLayout",
    meta: {
      authRoute: true,
    },
  },
  {
    path: "/forgot-password",
    component: lazy(() => import("../../pages/authentication/ForgotPassword")),
    exact: true,
    layout: "BlankLayout",
    meta: {
      authRoute: true,
    },
  },
  {
    path: "/verify-email",
    component: lazy(() => import("../../pages/authentication/VerifyEmail")),
    exact: true,
    layout: "BlankLayout",
    meta: {
      authRoute: true,
    },
  },
  {
    path: "/reset-password",
    component: lazy(() => import("../../pages/authentication/ResetPassword")),
    exact: true,
    layout: "BlankLayout",
    meta: {
      authRoute: true,
    },
  },
];

export default AuthenticationRoutes;
