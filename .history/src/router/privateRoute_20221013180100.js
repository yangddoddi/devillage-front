import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLogin = localStorage.getItem("accessToken");
  return (
    <Route
      {...rest}
      render={(props) => {
        !isLogin && alert("로그인이 필요합니다.");
        return isLogin ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
};
