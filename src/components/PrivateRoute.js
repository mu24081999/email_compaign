import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Create a PrivateRoute component to handle protected routes
const PrivateRoute = ({ children, isAuthenticated, isValid }) => {
  if (!isAuthenticated) {
    // Redirect to sign-in if not authenticated
    return <Navigate to="/sign-in" replace />;
  }

  if (isAuthenticated && !isValid) {
    // Redirect to subscriptions if authenticated but not valid
    return <Navigate to="/subscriptions" replace />;
  }

  // Render children if authenticated and valid
  return children;
};

export default PrivateRoute;
