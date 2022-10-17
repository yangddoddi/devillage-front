import logo from "./logo.svg";
import "./App.scss";
import { RouterConfig } from "./router/RouterConfig";
import React, { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import "antd/dist/antd.css";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "./store/Auth";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.accessToken);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const decoded = jwtDecode(accessToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      if (token !== accessToken) {
        axios.defaults.headers.common["Authorization"] = "";
      }
      dispatch(
        setToken({
          accessToken: accessToken,
          userId: decoded.sequence,
          nickname: decoded.nickname,
          email: decoded.sub,
          userRole: decoded.role,
        })
      );
    }
  }, []);

  return (
    <>
      <RouterConfig />
    </>
  );
}

export default App;
