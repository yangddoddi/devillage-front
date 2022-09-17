import styles from "./PostsList.module.scss";

export const PostsList = ({ ListName, children }) => {
  return (
    <>
      <div className={styles.bottomContainer}>
        <div className={styles.title}>{ListName}</div>
        <div className={styles.boardContainer}>{children}</div>
        <button className="moreBtn">더보기</button>
      </div>
    </>
  );
};
