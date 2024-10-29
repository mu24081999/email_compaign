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
      path: "/email-template",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated}>
          <EmailTemplate />
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
      path: "/pricing",
      element: <Pricing />,
      children: [],
      breadcrumb: "Login",
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