import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { setRefreshToken } from "../../store/Storage";
import { Navigate } from "react-router-dom";

const GoogleOAuthLogin = () => {
  const params = useParams();

  useEffect(() => {
    const accessToken = params.accessToken;
    const refreshToken = params.refreshToken;
    const decoded = jwtDecode(accessToken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    setRefreshToken(refreshToken);
    dispatch(
      setToken({
        accessToken: accessToken,
        userId: decoded.sequence,
        nickname: decoded.nickname,
        email: decoded.sub,
        userRole: decoded.role,
      })
    );
    navi("/");
  }, []);

  return <div></div>;
};
