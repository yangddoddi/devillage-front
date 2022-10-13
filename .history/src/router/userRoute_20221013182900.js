import React from "react";
import { Route, useLocation } from "react-router-dom";

import { Navigate } from "react-router-dom";

export const UserRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();
};
