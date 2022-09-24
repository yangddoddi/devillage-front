import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./store/Auth";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { setRefreshToken, getRefreshToken } from "./store/Storage";
import { parseJwt } from "./util/TokenParser";

const root = ReactDOM.createRoot(document.getElementById("root"));
axios.defaults.baseURL = "http://localhost:8080"; // 요청할 기본 URL
axios.defaults.withCredentials = true; // 쿠키 전달

axios.defaults.headers.post["Content-Type"] = "application/json"; // POST 요청 시 Content-Type

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return axios
        .post("http://localhost:8080/auth/token/refresh", {
          headers: {
            RefreshToken: getRefreshToken(),
          },
        })
        .then((res) => {
          if (res.status === 201) {
            const accessToken = res.data.accessToken;
            const refreshToken = res.data.refreshToken;
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${accessToken}`;
            setRefreshToken(refreshToken);
            originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);

const store = configureStore({
  reducer: {
    token: tokenReducer.reducer,
  },
});

root.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
