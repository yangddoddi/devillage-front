import axios from "axios";

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

export const silentRefresh = () => {
  axios
    .post("http://localhost:8080/auth/token/refresh", data)
    .then(postToken)
    .catch((error) => {
      console.log(error);
    });
};

export const onLogicSuccess = (response) => {
  const { accessToken } = response.data;

  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  setTimeout(onSilentRefresh, 1000 * 60 * 60);
};
