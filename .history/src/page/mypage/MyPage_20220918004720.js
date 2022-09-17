import styles from "./MyPage.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getRefreshToken, removeRefreshToken } from "../../store/Storage";
import { deleteToken } from "../../api/DeleteToken";

export const MyPage = () => {
  const { accessToken } = useSelector((state) => state.token);

  const dispatch = useDispatch();
  const navi = useNavigate();

  const refreshToken = getRefreshToken();

  const onClickHandler = async () => {
    const result = await deleteToken(refreshToken);
    if (result.status === 200) {
      removeRefreshToken();
      navi("/");
    } else {
      alert("로그아웃 실패");
    }
  };

  //   const { accessToken } = useSelector((state) => state.token);

  //   const dispatch = useDispatch();
  //   const navigate = useNavigate;

  //   const refreshToken = getRefreshToken();

  //   async function onLogoutHandler() {
  //     const data = await deleteToken({ refreshToken }, accessToken);
  //     if (data.status === 200) {
  //       dispatch(removeRefreshToken());
  //       removeRefreshToken();
  //       navigate("/");
  //     } else {
  //       alert("로그아웃 실패");
  //     }
  //   }

  return (
    <div className={styles.myPage}>
      <ul className={styles.myPageList}>
        <li>마이페이지</li>
        <li>북마크</li>
        <li>글쓰기</li>
        <li className={styles.logout}>로그아웃</li>
      </ul>
    </div>
  );
};
