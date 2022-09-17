import React from "react";
import { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { SearchOutlined } from "@ant-design/icons";
import { SearchBox } from "../searchBox/SearchBox";
import { Link } from "react-router-dom";
import { MyPage } from "../../page/mypage/MyPage";
import { useSelector, useDispatch } from "react-redux";

export const Header = () => {
  const [searchBox, setSearchBox] = useState(false);
  const onClickHandler = () => {
    setSearchBox(!searchBox);
  };

  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.token);

  useEffect(() => {
    if (searchBox) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [searchBox]);

  const [myPage, setMyPage] = useState(false);
  const onClickMyPage = () => {
    setMyPage(!myPage);
  };

  const onClickNotice = () => {
    dispatch.apply();
  };

  const onClickRanking = () => {
    alert("준비중입니다.");
  };

  const onClickStudy = () => {
    alert("준비중입니다.");
  };

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.logo} as={Link} to="/main">
          <Link to="/" style={{ color: "black" }}>
            Code<span>States</span>
          </Link>
        </div>
        <ul className={styles.list}>
          <li className={styles.listItem} onClick={onClickNotice}>
            공지사항
          </li>
          <li className={styles.listItem} onClick={onClickRanking}>
            회원랭킹
          </li>
          <li className={styles.listItem} onClick={onClickFreeBoard}>
            자유게시판
          </li>
          <li className={styles.listItem} onClick={onClickQna}>
            Q&A
          </li>
          <li className={styles.listItem} onClick={onClickStudy}>
            강의
          </li>
        </ul>
        <div className={styles.searchAndLogin}>
          <div className={styles.searchLogo} onClick={onClickHandler}>
            <SearchOutlined />
          </div>
          <button className={styles.loginBtn}>
            {accessToken ? (
              <Link style={{ color: "white" }} onClick={onClickMyPage}>
                MyPage
              </Link>
            ) : (
              <Link to="/login" style={{ color: "white" }}>
                Login
              </Link>
            )}
          </button>
        </div>
      </nav>
      {searchBox ? <SearchBox /> : null}
      {myPage ? <MyPage /> : null}
    </>
  );
};
