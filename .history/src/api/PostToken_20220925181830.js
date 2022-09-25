// import axios from "axios";
// import { setRefreshToken, getRefreshToken } from "../store/Storage";

// export const postToken = async (email, password) => {
//   const result = await axios
//     .post(
//       "http://localhost:8080/auth/token",
//       {
//         email: email,
//         password: password,
//       },
//       {
//         headers: {
//           "Refresh-Token": getRefreshToken(),
//         },
//       }
//     )
//     .catch((error) => {

//     });
//   return result;
// };

// const silentRefresh = async () => {
//   const response = await fetch("http://localhost:8080/auth/token/refresh", {
//     method: "POST",
//     headers: {
//       "Refresh-Token": getRefreshToken(),
//     },
//   })
//     .then(onLoginSuccess)
//     .catch((error) => {
//       console.log(error);
//     });
//   const data = await response.json();
//   return data;
// };

// const onLoginSuccess = (response) => {
//   // const { accessToken } = response.data;
//   console.log(response);
//   const accessToken = response.data.accessToken;
//   const refreshToken = response.data.refreshToken;

//   axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
//   setRefreshToken(refreshToken);

//   setTimeout(silentRefresh, 1000 * 60 * 60);
// };
