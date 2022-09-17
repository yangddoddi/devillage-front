import styles from "./MyPage.module.scss";
import { Link } from "react-router-dom";

export const MyPage = () => {
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
