import React from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ component: Component, ...rest }) => {
  const isLogin = localStorage.getItem("accessToken");
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};
