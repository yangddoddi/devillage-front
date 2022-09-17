import styles from "./PostsList.module.scss";
import { Pagination } from "antd";
import { useEffect } from "react";

export const PostsList = ({ ListName, children }) => {
  const [category, setCategory] = useEffect("");

  if (ListName === "all") {
    setCategory("recent");
  } else if (ListName === "web") {
    setCategory("자유게시판");
  } else if (ListName === "app") {
    setCategory("공지사항");
  } else if (ListName === "design") {
    setCategory("자유게시판");
  }

  return (
    <>
      <div className={styles.bottomContainer}>
        <div className={styles.title}>{ListName}</div>
        <div className={styles.boardContainer}>{children}</div>
      </div>
    </>
  );
};
