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
}) => {
  const location = useLocation();
  const [lastLocation, setLastLocation] = useState(null);
  const navigate = useNavigate();
  console.log(localStorage.getItem("lastLocation"), "google");
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
  if (
    !subscriptionLoading &&
    !authLoading &&
    !isAuthenticated
    // && startingAuth
  ) {
    // Redirect to sign-in if not authenticated
    return <Navigate to="/sign-in" replace state={{ from: location }} />;
  }

  if (
    !authLoading &&
    !subscriptionLoading &&
    isAuthenticated &&
    !isValid
    // && startingAuth
  ) {
    // Redirect to subscriptions if authenticated but not valid
    return <Navigate to="/subscriptions" replace state={{ from: location }} />;
  }

  // Render children if authenticated and valid
  return children;
};

export default PrivateRoute;
