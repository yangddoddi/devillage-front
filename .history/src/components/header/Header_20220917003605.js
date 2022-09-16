import React from "react";
import { useEffect } from "react";
import styles from "./Header.module.scss";
import { SearchOutlined } from "@ant-design/icons";

export const Header = () => {
  const [searchBox, setSearchBox] = useState(false);

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          Code<span>States</span>
        </div>
        <ul className={styles.list}>
          <li className={styles.listItem}>공지사항</li>
          <li className={styles.listItem}>회원랭킹</li>
          <li className={styles.listItem}>자유게시판</li>
          <li className={styles.listItem}>Q&A</li>
          <li className={styles.listItem}>중고거래</li>
        </ul>
        <div className={styles.searchAndLogin}>
          <div className={styles.searchLogo}>
            <SearchOutlined />
          </div>
          <button className={styles.loginBtn}>Login</button>
        </div>
      </nav>
      <form className={styles.searchBox}>
        <input placeholder="Please enter your search term" type="text"></input>
      </form>
    </>
  );
};
