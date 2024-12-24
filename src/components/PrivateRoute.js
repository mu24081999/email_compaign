import { Navigate, useLocation } from "react-router-dom";
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

  if (
    !subscriptionLoading &&
    !authLoading &&
    !isAuthenticated &&
    startingAuth
  ) {
    // Redirect to sign-in if not authenticated
    return <Navigate to="/sign-in" replace state={{ from: location }} />;
  }

  if (
    !authLoading &&
    !subscriptionLoading &&
    isAuthenticated &&
    !isValid &&
    startingAuth
  ) {
    // Redirect to subscriptions if authenticated but not valid
    return <Navigate to="/subscriptions" replace state={{ from: location }} />;
  }

  // Render children if authenticated and valid
  return children;
};

export default PrivateRoute;
