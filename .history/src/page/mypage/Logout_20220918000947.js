import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getRefreshToken, removeRefreshToken } from "../../storeage/Cookie";

export const Logout = () => {
  const { accessToken } = useSelector((state) => state.token);

  const dispatch = useDispatch();
  const navi = useNavigate();

  const refreshToken = getRefreshToken();

  return <div>aa</div>;
};
