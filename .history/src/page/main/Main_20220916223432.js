import styles from "./Main.module.scss";

export const Main = () => {
  return (
    <div className={styles.main}>
      <div className={styles.imgBox} />

      <div className={styles.bottomContainer}>
        <div className={styles.title}>Recent Post</div>
        <div className={styles.boardContainer}>
          <div className={styles.boardItem}>
            <div className={styles.boardItem_left}>
              <h1>제목</h1>
              <p>내용 줄줄이</p>
              <span>태그</span>
              <div className={styles.postInfo}>작성일/조회수</div>
            </div>
            <div className={styles.boardItem_right}>
              <img src="/image/web.jpeg"></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
