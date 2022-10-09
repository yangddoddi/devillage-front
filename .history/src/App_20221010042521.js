import logo from "./logo.svg";
import "./App.scss";
import { RouterConfig } from "./router/RouterConfig";
import React, { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import dispatch from "react-redux";
import { setToken } from "../../store/Auth";
import { setRefreshToken } from "../../store/Storage";
import { Dispatch } from "redux";
import { SERVER } from "../../util/Variables";
import axios from "axios";
import "antd/dist/antd.css";

function App() {
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
