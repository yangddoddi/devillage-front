import React from "react";
import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}></div>
      <ul className={styles.list}>
        <li>공지사항</li>
        <li>회원랭킹</li>
        <li>자유게시판</li>
        <li>Q&A</li>
        <li>중고거래</li>
      </ul>
      <div>
        <div>Search</div>
        <button>Login</button>
      </div>
    </nav>
  );
};
