import styles from "./MyPage.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getRefreshToken, removeRefreshToken } from "../../store/Storage";
import { deleteToken } from "../../api/DeleteToken";
import { removeToken } from "../../store/Auth";
import { useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { setToken } from "../../store/Auth";
import { setRefreshToken } from "../../store/Storage";
import { Dispatch } from "redux";

export const MyPage = () => {
  const { isLogin, userId } = useSelector((state) => state.token);

  const navi = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      alert("로그인이 필요한 서비스입니다.");
      navi("/login");
    }
  }, []);

  useEffect(() => {
    console.log(userId);
    axios.get(`http://localhost:8080/users/profile/${userId}`).then((res) => {
      console.log(res);
    });
  }, []);

  const dispatch = useDispatch();

  const refreshToken = getRefreshToken();

  const logoutHandler = async () => {
    const result = await deleteToken(refreshToken);
    if (result.status === 200) {
      removeRefreshToken();
      dispatch(removeToken());
      navi("/");
    } else {
      alert("로그아웃 실패");
    }
  };

  return (
    <div className={styles.myPage}>
      <ul className={styles.myPageList}>
        <li>
          <Link to="/users/*" className={styles.link}>
            마이페이지
          </Link>
        </li>
        <li>북마크</li>
        <li>
          <Link to="/posts">글쓰기</Link>
        </li>
        <li className={styles.logout} onClick={logoutHandler}>
          로그아웃
        </li>
      </ul>
    </div>
  );
};
