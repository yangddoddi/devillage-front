import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setRefreshToken = (refreshToken) => {
  const now = new Date();
  const expires = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 7);

  return cookies.set("refresh_token", refreshToken, {
    // sameSite: "strict",
    path: "/",
    expires: new Date(expires),
  });
};

export const getRefreshToken = () => {
  cookies.get("refresh_token");
};

export const removeRefreshToken = () => {
  cookies.remove("refresh_token", {
    // sameSite: "strict",
    path: "/",
  });
  // 같은 도메인에서만 작동
  // 해당 경로로 삽입
};
