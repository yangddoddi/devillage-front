import React from "react";
import { Route, Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ children }, ...rest) => {
  const location = useLocation();
  const isLogin = localStorage.getItem("accessToken");

  if (!isLogin) {
    alert("로그인이 필요한 서비스입니다.");
    return <Navigate to={`/login?redirect=${location.pathname}`} />;
  }

  return children;
};
