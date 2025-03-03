import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

// import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
// import Register from "./pages/Auth/Register";
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
import Privacy from "./pages/Privacy";
import Chat from "./pages/Chat";
import UnAuthorized from "./pages/utils/UnAuthorized";

//admin dashboard
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminUsers from "./pages/Admin/Users";
import AdminTwlioAccounts from "./pages/Admin/TwilioAccounts";
import AdminTwilioAccountNumbers from "./pages/Admin/TwilioNumbers";
import AdminEmailTrigger from "./pages/Admin/EmailTrigger";
import AdminSubscription from "./pages/Admin/Subscriptions";
import AdminAddUser from "./pages/Admin/AddUser";
import AdminUpdateSubscription from "./pages/Admin/UpdateSubscription";
import AdminA2PRequests from "./pages/Admin/A2PRequests";

const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));

const router = (
  isAuthenticated,
  isValid,
  authLoading,
  subscriptionLoading,
  startingAuth,
  email_verified,
  user
) => {
  const routes = [
    {
      path: "/admin/user/update-subscription/:user_id",
      element: (
        <PrivateRoute
          user={user}
          email_verified={email_verified}
          isAuthenticated={isAuthenticated}
          authLoading={authLoading}
          subscriptionLoading={subscriptionLoading}
          startingAuth={startingAuth}
          isValid={isValid}
          requiredRoles={["admin"]}
        >
          <AdminUpdateSubscription />
        </PrivateRoute>
      ), // Protect the Dashboard route children: [],
      breadcrumb: "Admin Dashboard",
    },
    {
      path: "/admin/a2p-requests",
      element: (
        <PrivateRoute
          user={user}
          email_verified={email_verified}
          isAuthenticated={isAuthenticated}
          authLoading={authLoading}
          subscriptionLoading={subscriptionLoading}
          startingAuth={startingAuth}
          isValid={isValid}
          requiredRoles={["admin"]}
        >
          <AdminA2PRequests />
        </PrivateRoute>
      ), // Protect the Dashboard route children: [],
      breadcrumb: "Admin Dashboard",
    },
    {
      path: "/admin/add-user",
      element: (
        <PrivateRoute
          user={user}
          email_verified={email_verified}
          isAuthenticated={isAuthenticated}
          authLoading={authLoading}
          subscriptionLoading={subscriptionLoading}
          startingAuth={startingAuth}
          isValid={isValid}
          requiredRoles={["admin"]}
        >
          <AdminAddUser />
        </PrivateRoute>
      ), // Protect the Dashboard route    children: [],
      breadcrumb: "Admin Dashboard",
    },
    {
      path: "/admin/accounts/subscriptions",
      element: (
        <PrivateRoute
          user={user}
          email_verified={email_verified}
          isAuthenticated={isAuthenticated}
          authLoading={authLoading}
          subscriptionLoading={subscriptionLoading}
          startingAuth={startingAuth}
          isValid={isValid}
          requiredRoles={["admin"]}
        >
          <AdminSubscription />
        </PrivateRoute>
      ), // Protect the Dashboard route    children: [],
      breadcrumb: "Admin Dashboard",
    },
    {
      path: "/admin/trigger-email",
      element: (
        <PrivateRoute
          user={user}
          email_verified={email_verified}
          isAuthenticated={isAuthenticated}
          authLoading={authLoading}
          subscriptionLoading={subscriptionLoading}
          startingAuth={startingAuth}
          isValid={isValid}
          requiredRoles={["admin"]}
        >
          <AdminEmailTrigger />
        </PrivateRoute>
      ), // Protect the Dashboard route    children: [],
      breadcrumb: "Admin Dashboard",
    },
    {
      path: "/admin/account/phone-numbers/:sid",
      element: (
        <PrivateRoute
          user={user}
          email_verified={email_verified}
          isAuthenticated={isAuthenticated}
          authLoading={authLoading}
          subscriptionLoading={subscriptionLoading}
          startingAuth={startingAuth}
          isValid={isValid}
          requiredRoles={["admin"]}
        >
          <AdminTwilioAccountNumbers />
        </PrivateRoute>
      ), // Protect the Dashboard route    children: [],
      breadcrumb: "Admin Dashboard",
    },
    {
      path: "/admin/dashboard",
      element: (
        <PrivateRoute
          user={user}
          email_verified={email_verified}
          isAuthenticated={isAuthenticated}
          authLoading={authLoading}
          subscriptionLoading={subscriptionLoading}
          startingAuth={startingAuth}
          isValid={isValid}
          requiredRoles={["admin"]}
        >
          <AdminDashboard />
        </PrivateRoute>
      ), // Protect the Dashboard route    children: [],
      breadcrumb: "Admin Dashboard",
    },
    {
      path: "/admin/users",
      element: (
        <PrivateRoute
          user={user}
          email_verified={email_verified}
          isAuthenticated={isAuthenticated}
          authLoading={authLoading}
          subscriptionLoading={subscriptionLoading}
          startingAuth={startingAuth}
          isValid={isValid}
          requiredRoles={["admin"]}
        >
          <AdminUsers />
        </PrivateRoute>
      ), // Protect the Dashboard route    children: [],
      breadcrumb: "Admin Users",
    },
    {
      path: "/admin/twilio_accounts",
      element: (
        <PrivateRoute
          user={user}
          email_verified={email_verified}
          isAuthenticated={isAuthenticated}
          authLoading={authLoading}
          subscriptionLoading={subscriptionLoading}
          startingAuth={startingAuth}
          isValid={isValid}
          requiredRoles={["admin"]}
        >
          <AdminTwlioAccounts />
        </PrivateRoute>
      ), // Protect the Dashboard route    children: [],
      breadcrumb: "Admin Users",
    },
    {
      path: "/",
      element: (
        <PrivateRoute
          user={user}
          email_verified={email_verified}
          isAuthenticated={isAuthenticated}
          authLoading={authLoading}
          subscriptionLoading={subscriptionLoading}
          startingAuth={startingAuth}
          isValid={isValid}
          requiredRoles={["user"]}
        >
          <Dashboard />
        </PrivateRoute>
      ), // Protect the Dashboard route    children: [],
      breadcrumb: "Dashboard",
    },
    {
      path: "/privacy-policy",
      element: <Privacy />, // Protect the Dashboard route    children: [],
      breadcrumb: "Dashboard",
    },
    {
      path: "/lead-finder",
      element: (
        <PrivateRoute
          user={user}
          email_verified={email_verified}
          isAuthenticated={isAuthenticated}
          authLoading={authLoading}
          subscriptionLoading={subscriptionLoading}
          startingAuth={startingAuth}
          isValid={isValid}
        >
          <LeadFinder />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "email-template",
    },
    {
      path: "/sms-conversation",
      element: (
        <PrivateRoute
          user={user}
          email_verified={email_verified}
          isAuthenticated={isAuthenticated}
          authLoading={authLoading}
          subscriptionLoading={subscriptionLoading}
          startingAuth={startingAuth}
          isValid={isValid}
        >
          <Chat />
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
        <PrivateRoute
          user={user}
          email_verified={email_verified}
          isAuthenticated={isAuthenticated}
          authLoading={authLoading}
          subscriptionLoading={subscriptionLoading}
          startingAuth={startingAuth}
          isValid={isValid}
        >
          <DripCompaign />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "email-template",
    },
    {
      path: "/a2p-verification",
      element: (
        <PrivateRoute
          user={user}
          email_verified={email_verified}
          isAuthenticated={isAuthenticated}
          authLoading={authLoading}
          subscriptionLoading={subscriptionLoading}
          startingAuth={startingAuth}
          isValid={isValid}
        >
          <A2P />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "email-template",
    },
    {
      path: "/sms-campaign/:id",
      element: (
        <PrivateRoute
          user={user}
          email_verified={email_verified}
          isAuthenticated={isAuthenticated}
          authLoading={authLoading}
          subscriptionLoading={subscriptionLoading}
          startingAuth={startingAuth}
          isValid={isValid}
        >
          <ChildSMSCampaign />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "email-template",
    },
    {
      path: "/wallet",
      element: (
        <PrivateRoute
          user={user}
          email_verified={email_verified}
          isAuthenticated={isAuthenticated}
          authLoading={authLoading}
          subscriptionLoading={subscriptionLoading}
          startingAuth={startingAuth}
          isValid={isValid}
        >
          <Wallet />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "email-template",
    },
    {
      path: "/sms",
      element: (
        <PrivateRoute
          user={user}
          email_verified={email_verified}
          isAuthenticated={isAuthenticated}
          authLoading={authLoading}
          subscriptionLoading={subscriptionLoading}
          startingAuth={startingAuth}
          isValid={isValid}
        >
          <SMS />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "sms",
    },
    {
      path: "/phone-numbers",
      element: (
        <PrivateRoute
          user={user}
          email_verified={email_verified}
          isAuthenticated={isAuthenticated}
          authLoading={authLoading}
          subscriptionLoading={subscriptionLoading}
          startingAuth={startingAuth}
          isValid={isValid}
        >
          <Numbers />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "email-template",
    },
    {
      path: "/my-subscription",
      element: (
        <PrivateRoute
          user={user}
          email_verified={email_verified}
          isAuthenticated={isAuthenticated}
          authLoading={authLoading}
          subscriptionLoading={subscriptionLoading}
          startingAuth={startingAuth}
          isValid={isValid}
        >
          <Subscription />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "email-template",
    },
    {
      path: "/dialpad",
      element: (
        <PrivateRoute
          user={user}
          email_verified={email_verified}
          isAuthenticated={isAuthenticated}
          authLoading={authLoading}
          subscriptionLoading={subscriptionLoading}
          startingAuth={startingAuth}
          isValid={isValid}
        >
          <Dialpad />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "email-template",
    },
    {
      path: "/email-validation",
      element: (
        <PrivateRoute
          user={user}
          email_verified={email_verified}
          isAuthenticated={isAuthenticated}
          authLoading={authLoading}
          subscriptionLoading={subscriptionLoading}
          startingAuth={startingAuth}
          isValid={isValid}
        >
          <EmailValidation />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "email-template",
    },
    {
      path: "/add-sms-campaign",
      element: (
        <PrivateRoute
          user={user}
          email_verified={email_verified}
          isAuthenticated={isAuthenticated}
          authLoading={authLoading}
          subscriptionLoading={subscriptionLoading}
          startingAuth={startingAuth}
          isValid={isValid}
        >
          <AddSMSCampaign />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "add-sms-campaign",
    },
    {
      path: "/email-templates",
      element: (
        <PrivateRoute
          user={user}
          email_verified={email_verified}
          isAuthenticated={isAuthenticated}
          authLoading={authLoading}
          subscriptionLoading={subscriptionLoading}
          startingAuth={startingAuth}
          isValid={isValid}
        >
          <EmailTemplate />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "email-template",
    },
    {
      path: "/compaigns",
      element: (
        <PrivateRoute
          user={user}
          email_verified={email_verified}
          isAuthenticated={isAuthenticated}
          authLoading={authLoading}
          subscriptionLoading={subscriptionLoading}
          startingAuth={startingAuth}
          isValid={isValid}
        >
          <Compaigns />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "email-template",
    },
    {
      path: "/sequences",
      element: (
        <PrivateRoute
          user={user}
          email_verified={email_verified}
          isAuthenticated={isAuthenticated}
          authLoading={authLoading}
          subscriptionLoading={subscriptionLoading}
          startingAuth={startingAuth}
          isValid={isValid}
        >
          <Sequence />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "email-template",
    },
    {
      path: "/accounts",
      element: (
        <PrivateRoute
          user={user}
          email_verified={email_verified}
          isAuthenticated={isAuthenticated}
          authLoading={authLoading}
          subscriptionLoading={subscriptionLoading}
          startingAuth={startingAuth}
          isValid={isValid}
        >
          <EmailAccounts />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "email-template",
    },
    {
      path: "/compaign/:id",
      element: (
        <PrivateRoute
          user={user}
          email_verified={email_verified}
          isAuthenticated={isAuthenticated}
          authLoading={authLoading}
          subscriptionLoading={subscriptionLoading}
          startingAuth={startingAuth}
          isValid={isValid}
        >
          <Compaign />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "compaign",
    },
    {
      path: "/add-compaign",
      element: (
        <PrivateRoute
          user={user}
          email_verified={email_verified}
          isAuthenticated={isAuthenticated}
          authLoading={authLoading}
          subscriptionLoading={subscriptionLoading}
          startingAuth={startingAuth}
          isValid={isValid}
        >
          <AddCompaign />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "compaign",
    },
    {
      path: "/connect-email-account",
      element: (
        <PrivateRoute
          user={user}
          email_verified={email_verified}
          isAuthenticated={isAuthenticated}
          authLoading={authLoading}
          subscriptionLoading={subscriptionLoading}
          startingAuth={startingAuth}
          isValid={isValid}
        >
          <AddEmail />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "compaign",
    },
    {
      path: "/email-schedule",
      element: (
        <PrivateRoute
          user={user}
          email_verified={email_verified}
          isAuthenticated={isAuthenticated}
          authLoading={authLoading}
          subscriptionLoading={subscriptionLoading}
          startingAuth={startingAuth}
          isValid={isValid}
        >
          <Schedule />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "compaign",
    },
    {
      path: "/common-box",
      element: (
        <PrivateRoute
          user={user}
          email_verified={email_verified}
          isAuthenticated={isAuthenticated}
          authLoading={authLoading}
          subscriptionLoading={subscriptionLoading}
          startingAuth={startingAuth}
          isValid={isValid}
        >
          <CommonBox />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "compaign",
    },
    {
      path: "/account-settings",
      element: (
        <PrivateRoute
          user={user}
          email_verified={email_verified}
          isAuthenticated={isAuthenticated}
          authLoading={authLoading}
          subscriptionLoading={subscriptionLoading}
          startingAuth={startingAuth}
          isValid={isValid}
        >
          <Profile />
        </PrivateRoute>
      ),
      children: [],
      breadcrumb: "compaign",
    },
    { path: "/unauthorized", element: <UnAuthorized /> },
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
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Login />
        </Suspense>
      ),
      children: [],
      breadcrumb: "Login",
    },
    {
      path: "/sign-up",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Register />{" "}
        </Suspense>
      ),
      children: [],
      breadcrumb: "Login",
    },
  ];
  return createBrowserRouter(routes);
};

export default router;
