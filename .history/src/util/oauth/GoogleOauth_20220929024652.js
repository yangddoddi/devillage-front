import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setRefreshToken } from "../../store/Storage";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/Auth";
import axios from "axios";
import jwtDecode from "jwt-decode";

export const GoogleOAuthLogin = () => {
  const navigate = useNavigate();
  const { accessToken, refreshToken } = useParams();
  const dispatch = useDispatch();
  console.log(accessToken);

  useEffect(() => {
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
