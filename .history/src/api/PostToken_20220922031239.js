import axios from "axios";
import { setRefreshCookie } from "../store/Storage";

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

const silentRefresh = () => {
  axios
    .post("http://localhost:8080/auth/token/refresh")
    .then(onLoginSuccess)
    .catch((error) => {
      console.log(error);
    });
};

const onLoginSuccess = (response) => {
  // const { accessToken } = response.data;
  const accessToken = response.data.accessToken;
  const refreshToken = response.data.refreshToken;

  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  setRefreshCookie(refreshToken);

  setTimeout(silentRefresh, 1000 * 60 * 60);
};
