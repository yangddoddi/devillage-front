import logo from "./logo.svg";
import "./App.scss";
import { RouterConfig } from "./router/RouterConfig";
import React, { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { setToken } from "../../store/Auth";
import "antd/dist/antd.css";
import useDispatch from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
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
    }
  }, []);

  return (
    <>
      <RouterConfig />
    </>
  );
}

export default App;
