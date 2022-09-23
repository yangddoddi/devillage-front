import axios from "axios";
import { setRefreshToken, getRefreshToken } from "../store/Storage";

export const postToken = async (email, password) => {
  const response = await fetch("http://localhost:8080/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then(onLoginSuccess)
    .catch((e) => console.log(e));
  const data = await response.json();
  return data;
};

const silentRefresh = async () => {
  const response = await fetch("http://localhost:8080/auth/token/refresh", {
    method: "POST",
    headers: {
      "Refresh-Token": getRefreshToken(),
    },
  })
    .then(onLoginSuccess)
    .catch((error) => {
      console.log(error);
    });
  const data = await response.json();
  return data;
};

const onLoginSuccess = (response) => {
  // const { accessToken } = response.data;
  const accessToken = response.data.accessToken;
  const refreshToken = response.data.refreshToken;

  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  setRefreshToken(refreshToken);

  setTimeout(silentRefresh, 1000 * 60 * 60);
};
