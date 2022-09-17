import axios from "axios";

const JWT_EXPIRY_TIME = 600000; // 10minute

export const login = (email, password) => {
  return axios
    .post("/auth", { email, password })
    .then((res) => {
      const { token, user } = res.data;
      const expiryTime = new Date().getTime() + JWT_EXPIRY_TIME;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("expiryTime", expiryTime);
      return user;
    })
    .catch((err) => console.log(err));
};

// export const onSilentRefresh = () => {
//   axios
//     .post("/auth/refresh", { email, password })
//     .then(onLoginSuccess())
//     .catch((err) => console.log(err));
// };

// export const onLoginSuccess = (response) => {
//   const { accessToken } = response.data;

//   axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

//   setTimeout(onSilentRefresh(), JWT_EXPIRY_TIME);
// };
