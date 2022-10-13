import React from "react";
import { Route, Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const isLogin = localStorage.getItem("accessToken");

  if (!isLogin) {
    return <Navigate to={`/login?redirect=${location.pathname}`} />;
  }

  return children;
};
