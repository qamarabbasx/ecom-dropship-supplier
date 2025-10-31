import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  return sessionStorage.getItem("user") ? (
    <Navigate to="/dashboard" />
  ) : (
    children
  );
};

export default PublicRoute;
