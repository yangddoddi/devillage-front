import React from "react";
import { Route, Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();
  const isLogin = localStorage.getItem("accessToken");

  if (!isLogin) {
    return <Navigate to={`/login?redirect=${location.pathname}`} />;
  }

  return <Route {...rest} element={<Component />} />;
};
