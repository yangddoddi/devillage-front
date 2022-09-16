import React from "react";
import { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { SearchOutlined } from "@ant-design/icons";
import { SearchBox } from "../searchBox/SearchBox";
import { Link } from "react-router-dom";

export const Header = () => {
  const [searchBox, setSearchBox] = useState(false);
  const onClickHandler = () => {
    setSearchBox(!searchBox);
  };

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.logo} as={Link} to="/main">
          <Link to="/" style={{color = "black"}}>
            Code<span>States</span>
          </Link>
        </div>

        <ul className={styles.list}>
          <li className={styles.listItem}>공지사항</li>
          <li className={styles.listItem}>회원랭킹</li>
          <li className={styles.listItem}>자유게시판</li>
          <li className={styles.listItem}>Q&A</li>
          <li className={styles.listItem}>중고거래</li>
        </ul>
        <div className={styles.searchAndLogin}>
          <div className={styles.searchLogo} onClick={onClickHandler}>
            <SearchOutlined />
          </div>
          <button className={styles.loginBtn}>Login</button>
        </div>
      </nav>
      {searchBox ? <SearchBox /> : null}
    </>
  );
};
