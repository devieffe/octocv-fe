import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const StaffRoute = ({ children }) => {
  const { isAuthenticated, isStaff } = useSelector((state) => state.auth);

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!isStaff) return <Navigate to="/unauthorized" />;

  return children;
};

export default StaffRoute;
