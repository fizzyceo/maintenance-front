import React from "react";
import { Navigate } from "react-router-dom";

//AuthenticationInner pages
// import BasicSignIn from "../pages/AuthenticationInner/Login/BasicSignIn";
// import BasicLogout from "../pages/AuthenticationInner/Logout/BasicLogout";
// import BasicSuccessMsg from "../pages/AuthenticationInner/SuccessMessage/BasicSuccessMsg";
// import CoverSuccessMsg from "../pages/AuthenticationInner/SuccessMessage/CoverSuccessMsg";
// import BasicTwosVerify from "../pages/AuthenticationInner/TwoStepVerification/BasicTwosVerify";
// import CoverTwosVerify from "../pages/AuthenticationInner/TwoStepVerification/CoverTwosVerify";
// import Basic404 from "../pages/AuthenticationInner/Errors/Basic404";
// import Cover404 from "../pages/AuthenticationInner/Errors/Cover404";
// import Alt404 from "../pages/AuthenticationInner/Errors/Alt404";
// import Error500 from "../pages/AuthenticationInner/Errors/Error500";
// import CoverPasswCreate from "../pages/AuthenticationInner/PasswordCreate/CoverPasswCreate";
// import Offlinepage from "../pages/AuthenticationInner/Errors/Offlinepage";
// import Register from "../pages/Authentication/Register";
//login
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
// User Profile
import UserProfile from "../pages/Authentication/user-profile";
import ResetPassword from "../pages/Authentication/ResetPassword";
import { StaffsPage } from "../pages/Staffs/Staffs";

import { Dashboards } from "../pages";
import ReportsPage from "../pages/Reports";
const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboards.DashboardOne /> },
  { path: "/dashboard2", component: <Dashboards.Dashboard2 /> },

  { path: "/staffs", component: <StaffsPage /> },
  { path: "/reports", component: <ReportsPage /> },

  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
  //User Profile
  { path: "/profile", component: <UserProfile /> },

  // this route should be at the end of all other routes
];

const publicRoutes = [
  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/reset-password", component: <ResetPassword /> },

  // { path: "/forgot-password", component: <ForgetPasswordPage /> },
  // { path: "/register", component: <Register /> },
  //AuthenticationInner pages
  // { path: "/auth-signin-basic", component: <BasicSignIn /> },
  // { path: "/auth-signin-cover", component: <CoverSignIn /> },
  // { path: "/auth-signup-basic", component: <BasicSignUp /> },
  // { path: "/auth-signup-cover", component: <CoverSignUp /> },
  // { path: "/auth-pass-reset-basic", component: <BasicPasswReset /> },
  // { path: "/auth-pass-reset-cover", component: <CoverPasswReset /> },
  // { path: "/auth-lockscreen-basic", component: <BasicLockScreen /> },
  // { path: "/auth-lockscreen-cover", component: <CoverLockScreen /> },
  // { path: "/auth-logout-basic", component: <BasicLogout /> },
  // // { path: "/auth-logout-cover", component: <CoverLogout /> },
  // { path: "/auth-success-msg-basic", component: <BasicSuccessMsg /> },
  // { path: "/auth-success-msg-cover", component: <CoverSuccessMsg /> },
  // { path: "/auth-twostep-basic", component: <BasicTwosVerify /> },
  // { path: "/auth-twostep-cover", component: <CoverTwosVerify /> },
  // { path: "/auth-404-basic", component: <Basic404 /> },
  // { path: "/auth-404-cover", component: <Cover404 /> },
  // { path: "/auth-404-alt", component: <Alt404 /> },
  // { path: "/auth-500", component: <Error500 /> },

  // { path: "/auth-pass-change-cover", component: <CoverPasswCreate /> },
  // { path: "/auth-offline", component: <Offlinepage /> },
];

export { authProtectedRoutes, publicRoutes };
