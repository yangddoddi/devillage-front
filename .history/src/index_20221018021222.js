import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import { configureStore } from "@reduxjs/toolkit";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import {
  setRefreshToken,
  getRefreshToken,
  removeRefreshToken,
} from "./store/Storage";
import { parseJwt } from "./util/TokenParser";
import tokenReducer from "./store/Auth";
import { SERVER } from "./util/Variables";
import persistReducer from "redux-persist/es/persistReducer";
import persistedReducer from "./store/Auth";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import thunk from "redux-thunk";
import localStorage from "redux-persist/es/storage";
import { ApiFilled } from "@ant-design/icons";

const root = ReactDOM.createRoot(document.getElementById("root"));
axios.defaults.baseURL = SERVER; // 요청할 기본 URL
axios.defaults.withCredentials = true; // 쿠키 전달

axios.defaults.headers.post["Content-Type"] = "application/json"; // POST 요청 시 Content-Type
// axios.defaults.headers.post["Authorization"] = `Bearer ${accessToken}`; // POST 요청 시 Authorization

axios.interceptors.request.use((config) => {
  localStorage.getItem("accessToken").then((accessToken) => {
    if (accessToken != null) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  return config;
});

let isTokenRefreshing = false;

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const refreshToken = getRefreshToken();
    const originalRequest = error.config;
    if (error.response.status === 401 && !isTokenRefreshing && refreshToken) {
      const instance = axios.create();
      delete instance.defaults.headers.common["Authorization"];
      instance.defaults.headers.common[
        "RefreshToken"
      ] = `Bearer ${refreshToken}`;
      isTokenRefreshing = true;
      return instance
        .post(`${SERVER}/auth/token/refresh`, {
          headers: {
            RefreshToken: `Bearer ` + refreshToken,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            const accessToken = res.data.accessToken;
            const refreshToken = res.data.refreshToken;
            parseJwt(accessToken);
            localStorage.setItem("accessToken", accessToken);
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${accessToken}`;
            setRefreshToken(refreshToken);

            // 새로 받은 토큰 저장 및 원래 요청 다시 보내기
            originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
            return axios(originalRequest);
          }
        });
    } else {
      alert("로그인이 필요합니다.");
      localStorage.removeItem("accessToken");
      if (refreshToken != null) {
        removeRefreshToken();
      }
    }
    isTokenRefreshing = false;
    return Promise.reject(error);
  }
);
const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

root.render(
  // <React.StrictMode>
  <CookiesProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </CookiesProvider>

  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
