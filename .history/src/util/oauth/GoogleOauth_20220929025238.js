import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { setRefreshToken } from "../../store/Storage";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/Auth";
import axios from "axios";
import jwtDecode from "jwt-decode";
import QueryString from "qs";

export const GoogleOAuthLogin = () => {
  const navigate = useNavigate();
//   const { accessToken, refreshToken } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(accessToken);

  useEffect(() => {
    const query = QueryString.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    const accessToken = query.accessToken;
    const refreshToken = query.refreshToken;
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
  } , [dispatch, location.search, navigate]);