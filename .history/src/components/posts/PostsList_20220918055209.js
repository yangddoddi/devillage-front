import styles from "./PostsList.module.scss";
import { Pagination } from "antd";
import { useEffect } from "react";
import { useState } from "react";

export const PostsList = ({ ListName, children }) => {
  const [category, setCategory] = useState("all");

  if (ListName === "all") {
    setCategory("recent");
  } else if (ListName === "free") {
    setCategory("자유게시판");
  } else if (ListName === "notice") {
    setCategory("공지사항");
  } else if (ListName === "qna") {
    setCategory("질문게시판");
  }

  return (
    <>
      <div className={styles.bottomContainer}>
        <div className={styles.title}>{category}</div>
        <div className={styles.boardContainer}>{children}</div>
      </div>
    </>
  );
};
