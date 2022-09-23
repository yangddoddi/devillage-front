import axios from "axios";
import { setRefreshToken, getRefreshToken } from "../store/Storage";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      originalRequest._retry = true;
      return axios
        .post("http://localhost:8080/auth/token/refresh", {
          headers: {
            "Refresh-Token": getRefreshToken(),
          },
        })
        .then((res) => {
          if (res.status === 201) {
            const accessToken = res.data.accessToken;
            const refreshToken = res.data.refreshToken;
            // 새로 받은 토큰 저장 및 원래 요청 다시 보내기
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${accessToken}`;
            setRefreshToken(refreshToken);
            originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
            return axios(originalRequest);
          }
        });
    }
    // 또 다시 오류 발생 시 오류 반환
    return Promise.reject(error);
  }
);

export default instance;
