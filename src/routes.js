import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
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
import Dialpad from "./pages/Dialpad";
import Numbers from "./pages/Numbers/Numbers";
import SMS from "./pages/SMS/SMS";
import AddSMSCampaign from "./pages/SMS/components/AddCampaign/AddCampaign";
import ChildSMSCampaign from "./pages/SMS/components/ChildCompaign/Compaign";
import Wallet from "./pages/Wallet";
import A2P from "./pages/A2P";
const router = (isAuthenticated, isValid) => {
  const routes = [
    {
      path: "/",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated} isValid={isValid}>
          <Dashboard />
        </PrivateRoute>
      ), // Protect the Dashboard route    children: [],
      breadcrumb: "Dashboard",
    },
    {
      path: "/lead-finder",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated} isValid={isValid}>
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
        <PrivateRoute isAuthenticated={isAuthenticated} isValid={isValid}>
          <DripCompaign />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "email-template",
    },
    {
      path: "/a2p-verification",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated} isValid={isValid}>
          <A2P />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "email-template",
    },
    {
      path: "/sms-campaign/:id",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated} isValid={isValid}>
          <ChildSMSCampaign />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "email-template",
    },
    {
      path: "/wallet",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated} isValid={isValid}>
          <Wallet />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "email-template",
    },
    {
      path: "/sms",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated} isValid={isValid}>
          <SMS />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "sms",
    },
    {
      path: "/phone-numbers",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated} isValid={isValid}>
          <Numbers />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "email-template",
    },
    {
      path: "/my-subscription",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated} isValid={isValid}>
          <Subscription />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "email-template",
    },
    {
      path: "/dialpad",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated} isValid={isValid}>
          <Dialpad />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "email-template",
    },
    {
      path: "/email-validation",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated} isValid={isValid}>
          <EmailValidation />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "email-template",
    },
    {
      path: "/add-sms-campaign",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated} isValid={isValid}>
          <AddSMSCampaign />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "add-sms-campaign",
    },
    {
      path: "/email-templates",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated} isValid={isValid}>
          <EmailTemplate />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "email-template",
    },
    {
      path: "/compaigns",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated} isValid={isValid}>
          <Compaigns />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "email-template",
    },
    {
      path: "/sequences",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated} isValid={isValid}>
          <Sequence />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "email-template",
    },
    {
      path: "/accounts",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated} isValid={isValid}>
          <EmailAccounts />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "email-template",
    },
    {
      path: "/compaign/:id",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated} isValid={isValid}>
          <Compaign />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "compaign",
    },
    {
      path: "/add-compaign",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated} isValid={isValid}>
          <AddCompaign />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "compaign",
    },
    {
      path: "/connect-email-account",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated} isValid={isValid}>
          <AddEmail />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "compaign",
    },
    {
      path: "/email-schedule",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated} isValid={isValid}>
          <Schedule />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "compaign",
    },
    {
      path: "/common-box",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated} isValid={isValid}>
          <CommonBox />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "compaign",
    },
    {
      path: "/account-settings",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated} isValid={isValid}>
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
      element: <Pricing isValid={isValid} />,
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
