import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
// Create a PrivateRoute component to handle protected routes
const PrivateRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/sign-in" />; // Redirect to login if not authenticated
};
export default PrivateRoute;
