import logo from "./logo.svg";
import "./App.scss";
import { RouterConfig } from "./router/RouterConfig";
import React, { useEffect, useState } from "react";
import axios from "axios";

import "antd/dist/antd.css";

function App() {
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }
  }, [accessToken]);

  return (
    <>
      <RouterConfig />
    </>
  );
}

export default App;
