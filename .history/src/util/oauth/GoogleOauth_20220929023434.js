import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { setRefreshToken } from "../../store/Storage";
import { Navigate } from "react-router-dom";

export const GoogleOAuthLogin = () => {
  const navigate = Navigate();
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
    navigate("/");
  }, []);

  return <div></div>;
};
