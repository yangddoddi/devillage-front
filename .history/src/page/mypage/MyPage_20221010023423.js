import styles from "./MyPage.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getRefreshToken, removeRefreshToken } from "../../store/Storage";
import { removeToken } from "../../store/Auth";
import { useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { setToken } from "../../store/Auth";
import { setRefreshToken } from "../../store/Storage";
import { Dispatch } from "redux";
import { SERVER } from "../../util/Variables";

export const MyPage = ({ myPage, setMyPage }) => {
  const { isLogin, userId } = useSelector((state) => state.token);

  const navi = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      alert("로그인이 필요한 서비스입니다.");
      navi("/login");
    }
  }, []);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      axios
        .delete(`${SERVER}/auth/token`, {
          headers: {
            RefreshToken: `Bearer ` + refreshToken,
          },
        })
        .then((res) => {
          if (res.status === 204) {
            removeRefreshToken();
            dispatch(removeToken());
            alert("로그아웃 되었습니다.");
            navi("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onClickHandler = () => {
    setMyPage(!myPage);
  };

  return (
    <div className={styles.myPage} onClick={onClickHandler}>
      <ul className={styles.myPageList}>
        <li>
          <Link to={`/users/${userId}`} className={styles.link}>
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
