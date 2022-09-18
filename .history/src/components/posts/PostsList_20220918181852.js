import styles from "./PostsList.module.scss";
import { useParam } from "react-router-dom";
import { useEffect, useState } from "react";

export const PostsList = ({ ListName, children }) => {
  const { category } = useParam();

  useEffect(() => {
    if (category === "qna") {
      setCategory("질문답변");
    } else if (category === "all") {
      setCategory("최근 게시물");
    } else if (category === "notice") {
      setCategory("공지사항");
    } else if (category === "free") {
      setCategory("자유게시판");
    }
  }, [category]);

  return (
    <>
      <div className={styles.bottomContainer}>
        <div className={styles.title}>{ListName}</div>
        <div className={styles.boardContainer}>{children}</div>
      </div>
    </>
  );
};
