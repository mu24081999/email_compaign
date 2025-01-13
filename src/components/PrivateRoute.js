import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
// Create a PrivateRoute component to handle protected routes
const PrivateRoute = ({
  children,
  isAuthenticated,
  isValid,
  authLoading,
  subscriptionLoading,
  startingAuth,
  email_verified,
  user,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  window.onbeforeunload = function (event) {
    // Display a confirmation dialog
    event.returnValue =
      "You have unsaved changes. Are you sure you want to leave?";
    localStorage.setItem("lastLocation", location.pathname);
  };

  useEffect(() => {
    // Redirect to the last location on component mount
    const savedLocation = localStorage.getItem("lastLocation");
    if (savedLocation && savedLocation !== location.pathname) {
      navigate(savedLocation);
      localStorage.removeItem("lastLocation");
    }
  }, []);
  if (!email_verified && isAuthenticated) {
    return (
      <Navigate
        to={`/otp?email=${user.email}&verified=false`}
        replace
        state={{ from: location }}
      />
    );
  }
  if (!subscriptionLoading && !authLoading && !isAuthenticated) {
    // Redirect to sign-in if not authenticated
    return <Navigate to="/sign-in" replace state={{ from: location }} />;
  }

  if (!authLoading && !subscriptionLoading && isAuthenticated && !isValid) {
    // Redirect to subscriptions if authenticated but not valid
    return <Navigate to="/subscriptions" replace state={{ from: location }} />;
  }

  // Render children if authenticated and valid
  return children;
};

export default PrivateRoute;
