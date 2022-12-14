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

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    if (accessToken != null) {
      console.log("accessToken: ", accessToken);
      const decoded = jwtDecode(accessToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      dispatch(
        setToken({
          accessToken: accessToken,
          userId: decoded.sequence,
          nickname: decoded.nickname,
          email: decoded.sub,
          userRole: decoded.role,
        })
      );
    } else if (accessToken == null) {
      return;
    }
  }, []);

  return (
    <>
      <RouterConfig />
    </>
  );
}

export default App;
