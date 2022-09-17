import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const getTokenCookie = () => {
  cookies.get("refresh_token");
};

export const removeTokenCookie = () => {
  cookies.remove("refresh_token", { path: "/" });
};
