import logo from "./logo.svg";
import "./App.scss";
import { RouterConfig } from "./router/RouterConfig";
import React, { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import "antd/dist/antd.css";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "./store/Auth";
import {
  getRefreshToken,
  removeRefreshToken,
  setRefreshToken,
} from "./store/Storage";
import { SERVER } from "./util/Variables";
import { parseJwt } from "./util/TokenParser";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.accessToken);

  axios.interceptors.request.use((config) => {
    console.log(token);
    console.log(localStorage.getItem("accessToken"));

    if (!localStorage.getItem("accessToken")) {
      localStorage.getItem("accessToken").then((res) => {
        config.headers.Authorization = `Bearer ${res}`;
      });
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
      // if (error.response.status === 401 && !refreshToken) {
      //   alert("로그인이 필요합니다.");
      // }

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
              originalRequest.headers[
                "Authorization"
              ] = `Bearer ${accessToken}`;
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
