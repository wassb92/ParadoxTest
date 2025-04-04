// client/src/components/AdminRoute.tsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { authToken, user } = useContext(AuthContext);
  if (!authToken || user?.role !== "admin") {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default AdminRoute;
