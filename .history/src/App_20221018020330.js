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

  // axios.interceptors.request.use((config) => {
  //   console.log(token);
  //   console.log(localStorage.getItem("accessToken"));

  //   if (!localStorage.getItem("accessToken")) {
  //     localStorage.getItem("accessToken").then((res) => {
  //       config.headers.Authorization = `Bearer ${res}`;
  //     });
  //   } else {
  //     delete axios.defaults.headers.common["Authorization"];
  //   }
  //   return config;
  // });

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
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
    }
  }, []);

  return (
    <>
      <RouterConfig />
    </>
  );
}

export default App;
