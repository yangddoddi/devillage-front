import styles from "./MyPage.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getRefreshToken, removeRefreshToken } from "../../storeage/Cookie";
import { DeleteToken } from "../../storeage/Token";

export const MyPage = () => {
  const { accessToken } = useSelector((state) => state.token);

  const dispatch = useDispatch();
  const navigate = useNavigate;

  const refreshToken = getRefreshToken();

  return (
    <div className={styles.myPage}>
      <ul className={styles.myPageList}>
        <li>마이페이지</li>
        <li>북마크</li>
        <li>글쓰기</li>
        <li className={styles.logout} onClick={onLogoutHandler}>
          로그아웃
        </li>
      </ul>
    </div>
  );
};
