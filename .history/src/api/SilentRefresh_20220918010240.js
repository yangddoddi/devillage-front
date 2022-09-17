import axios from "axios";

export const silentRefresh = () => {
  axios.post("http://localhost:8080/auth/token/refresh", data).then(post);
};
