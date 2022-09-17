import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Logout = () => {
  const { accessToken } = useSelector((state) => state.token);

  const dispatch = useDispatch();
};
