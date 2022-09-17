import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const getCookie = () => {
  cookies.get("refresh_token", { smaeSite: "strict", path: "/" });
};
