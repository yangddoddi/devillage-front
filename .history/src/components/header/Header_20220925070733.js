import React from "react";
import { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { SearchOutlined } from "@ant-design/icons";
import { SearchBox } from "../searchBox/SearchBox";
import { Link } from "react-router-dom";
import { MyPage } from "../../page/mypage/MyPage";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getRefreshToken } from "../../store/Storage";

export const Header = (props) => {
  const [searchBox, setSearchBox] = useState(false);
  const [search, setSearch] = useState("");
  const onClickHandler = () => {
    setSearchBox(!searchBox);
  };

  const { isLogin } = useSelector((state) => state.token);

  useEffect(() => {
    if (searchBox) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [searchBox]);

  useEffect(() => {
    axios.post(
      "http://localhost:8080/auth/token/refresh",
      {},
      {
        headers: {
          RefreshToken: `Bearer ${getRefreshToken()}`,
        },
      }
    );
  }, []);

  const refresh = async () => {
    const refreshToken = getRefreshToken();
    console.log(refreshToken);
    const result = await axios.post(
      "http://localhost:8080/auth/token/refresh",
      {
        headers: {
          "Refresh-Token": refreshToken,
        },
      }
    );
    console.log(result);
  };

  useEffect(() => {
    refresh();
  }, []);

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
          <Link to="/board/all" style={{ color: "black" }}>
            Dev_<span>illage</span>
          </Link>
        </div>
        <ul className={styles.list}>
          <li className={styles.listItem} onClick={onClickNotice}>
            <Link to="/board/notice" style={{ color: "black" }}>
              공지사항
            </Link>
          </li>
          <li className={styles.listItem} onClick={onClickRanking}>
            회원랭킹
          </li>
          <li className={styles.listItem} onClick={onClickFree}>
            <Link to="/board/free" style={{ color: "black" }}>
              자유게시판
            </Link>
          </li>
          <li className={styles.listItem} onClick={onClickQna}>
            <Link to="/board/qna" style={{ color: "black" }}>
              Q&A
            </Link>
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
            {isLogin ? (
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
