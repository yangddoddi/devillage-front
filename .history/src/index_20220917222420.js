import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import { configureStore } from "@reduxjs/toolkit";
import { tokenSlice } from "./store/Auth";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
axios.defaults.baseURL = "http://localhost:8080"; // 요청할 기본 URL
axios.defaults.withCredentials = true; // 쿠키 전달
axios.defaults.headers.post["Content-Type"] = "application/json"; // POST 요청 시 Content-Type

const store = configureStore({
  reducer: {
    token: tokenSlice,
  },
});

root.render(
  <React.StrictMode>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
