import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  // Example: check if "isLoggedIn" is set in localStorage
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;