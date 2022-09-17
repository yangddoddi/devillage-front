import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (key, value, option) => {
  cookies.set(key, value, option);
};

export const getCookie = (key) => {
  return cookies.get(key);
};
