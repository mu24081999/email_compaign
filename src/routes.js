import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import EmailTemplate from "./pages/EmailTemplate/EmailTemplate";
import PrivateRoute from "./components/PrivateRoute";
import Compaign from "./pages/Dashboard/components/Compaigns/ChildCompaign/Compaign";
import AddCompaign from "./pages/Dashboard/components/Compaigns/AddCompaign/AddCompaign";
import AddEmail from "./pages/Dashboard/components/EmailAccounts/Add/Add";
import Schedule from "./pages/Dashboard/components/Compaigns/ChildCompaign/components/Shedule/Shadule";
import Pricing from "./pages/Pricing/Pricing";
import Compaigns from "./pages/Dashboard/components/Compaigns/Compaigns";
import Sequence from "./pages/Dashboard/components/Sequence/Sequence";
import EmailAccounts from "./pages/Dashboard/components/EmailAccounts/EmailAccounts";
import Profile from "./pages/Dashboard/components/Profile/Profile";
import CommonBox from "./pages/CommonBox/CommonBox";
import OTP from "./pages/Auth/OTP";
import LeadFinder from "./pages/LeadFinder/Main";
import DripCompaign from "./pages/DripCompaign/Main";
import Subscription from "./pages/Subscription/Main";
import EmailValidation from "./pages/EmailValidation/Main";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import VerifyEmail from "./pages/Auth/VerifyEmail";
import ResetPassword from "./pages/Auth/ResetPassword";
const router = (isAuthenticated) => {
  const routes = [
    {
      path: "/",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated}>
          <Dashboard />
        </PrivateRoute>
      ), // Protect the Dashboard route    children: [],
      breadcrumb: "Dashboard",
    },
    {
      path: "/lead-finder",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated}>
          <LeadFinder />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "email-template",
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
      children: [],
      breadcrumb: "forgot-password",
    },
    {
      path: "/reset-password/:email",
      element: <ResetPassword />,
      children: [],
      breadcrumb: "reset-password",
    },
    {
      path: "/drip-compaign",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated}>
          <DripCompaign />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "email-template",
    },
    {
      path: "/my-subscription",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated}>
          <Subscription />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "email-template",
    },
    {
      path: "/email-validation",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated}>
          <EmailValidation />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "email-template",
    },
    {
      path: "/email-templates",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated}>
          <EmailTemplate />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "email-template",
    },
    {
      path: "/compaigns",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated}>
          <Compaigns />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "email-template",
    },
    {
      path: "/sequences",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated}>
          <Sequence />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "email-template",
    },
    {
      path: "/accounts",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated}>
          <EmailAccounts />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "email-template",
    },
    {
      path: "/compaign/:id",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated}>
          <Compaign />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "compaign",
    },
    {
      path: "/add-compaign",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated}>
          <AddCompaign />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "compaign",
    },
    {
      path: "/connect-email-account",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated}>
          <AddEmail />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "compaign",
    },
    {
      path: "/email-schedule",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated}>
          <Schedule />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "compaign",
    },
    {
      path: "/common-box",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated}>
          <CommonBox />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "compaign",
    },
    {
      path: "/account-settings",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated}>
          <Profile />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "compaign",
    },
    {
      path: "/verify-email/:email",
      element: <VerifyEmail />,
    },
    {
      path: "/subscriptions",
      element: <Pricing />,
    },
    {
      path: "/otp",
      element: <OTP />,
    },
    {
      path: "/sign-in",
      element: <Login />,
      children: [],
      breadcrumb: "Login",
    },
    {
      path: "/sign-up",
      element: <Register />,
      children: [],
      breadcrumb: "Login",
    },
  ];
  return createBrowserRouter(routes);
};

export default router;
