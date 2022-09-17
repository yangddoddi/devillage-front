import axios from "axios";

const JWT_EXPIRY_TIME = 60 * 60 * 24 * 7; // 7 days

const onLoginSuccess = (response) => {
  const { accessToken } = response.data;

  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
};
