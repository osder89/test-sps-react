import React from "react";
import { Navigate } from "react-router-dom";
import AuthService from "./services/auth";

function PrivateRoute({ element }) {
  const isAuthenticated = AuthService.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return element;
}

export default PrivateRoute;
