import axios from "axios";

const loginHandler = new LoginHandler();
const JWT_EXPIRY_TIME = 600000; // 10minute

export Login = (email, password) => {
  return axios
    .post("/auth", { email, password })
    .then(onLoginSuccess())
    .catch((err) => console.log(err));
};

onSilentRefresh = () => {
  axios
    .post("/auth/refresh", data)
    .then(onLoginSuccess())
    .catch((err) => console.log(err));
};

onLoginSuccess = (response) => {
  const { accessToken } = response.data;

  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  setTimeout(onSilentRefresh(), JWT_EXPIRY_TIME);
};

e
