import axios from "axios";

const JWT_EXPIRY_TIME = 60 * 60 * 24 * 7; // 7 days

onLogin = (email, password) => {
  return axios
    .post("/auth", { email, password })
    .then(onLoginSuccess())
    .catch((err) => console.log(err));
};

onSilentRefresh = () => {
  axios
    .post("/auth/refresh", data)
    .then(onLoginSuccess)
    .catch((err) => console.log(err));
};

onLoginSuccess = (response) => {
  const { accessToken } = response.data;

  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  setTimeout();
};
