// component/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
