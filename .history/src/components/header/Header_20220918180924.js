import React from "react";
import { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { SearchOutlined } from "@ant-design/icons";
import { SearchBox } from "../searchBox/SearchBox";
import { Link } from "react-router-dom";
import { MyPage } from "../../page/mypage/MyPage";
import { useSelector, useDispatch } from "react-redux";

export const Header = (props) => {
  const [searchBox, setSearchBox] = useState(false);
  const [search, setSearch] = useState("");
  const onClickHandler = () => {
    setSearchBox(!searchBox);
  };

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
    props.sendCategory("notice");
  };

  const onClickRanking = () => {
    alert("준비중입니다.");
  };

  const onClickStudy = () => {
    alert("준비중입니다.");
  };

  const onClickQna = () => {
    props.sendCategory("qna");
  };

  const onClickFree = () => {
    props.sendCategory("free");
  };

  const onClickLogo = () => {
    props.sendCategory("all");
  };

  const onSearchChangeHandler = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.logo} as={Link} to="/main" onClick={onClickLogo}>
          <Link to="/" style={{ color: "black" }}>
            Code<span>States</span>
          </Link>
        </div>
        <ul className={styles.list}>
          <li className={styles.listItem} onClick={onClickNotice}>
            <Link to="/board/notice" category="baaa">
              공지사항
            </Link>
          </li>
          <li className={styles.listItem} onClick={onClickRanking}>
            회원랭킹
          </li>
          <li className={styles.listItem} onClick={onClickFree}>
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
            <SearchOutlined onChange={onSearchChangeHandler} />
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
