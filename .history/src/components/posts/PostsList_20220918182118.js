import styles from "./PostsList.module.scss";
import { useParam } from "react-router-dom";
import { useEffect, useState } from "react";

export const PostsList = ({ ListName, children }) => {
  const [category, setCategory] = useState("all");

  // useEffect(() => {
  //   if (ListName === "qna") {
  //     setCategory("질문답변");
  //   } else if (ListName === "all") {
  //     setCategory("최근 게시물");
  //   } else if (ListName === "notice") {
  //     setCategory("공지사항");
  //   } else if (ListName === "free") {
  //     setCategory("자유게시판");
  //   }
  // }, [ListName]);

  return (
    <>
      <div className={styles.bottomContainer}>
        <div className={styles.title}>{ListName}</div>
        <div className={styles.boardContainer}>{children}</div>
      </div>
    </>
  );
};
