import styles from "./MyPage.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getRefreshToken, removeRefreshToken } from "../../store/Storage";
import { deleteToken } from "../../api/DeleteToken";
import { removeToken } from "../../store/Auth";

export const MyPage = () => {
  const { accessToken } = useSelector((state) => state.token);

  const dispatch = useDispatch();
  const navi = useNavigate();

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
          <Link to="/users/*" style={{ color: white }}>
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
