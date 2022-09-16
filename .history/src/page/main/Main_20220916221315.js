import styles from "./Main.module.scss";

export const Main = () => {
  return (
    <div className={styles.main}>
      <div className={styles.imgBox} />

      <div className={styles.bottomContainer}>
        <div className={styles.title}>전체 글 보기</div>
        <div className={styles.boardContainer}>
          <div className={styles.boardItem}>
            <div className={styles.boardItem_left}>
              <h1>제목</h1>
              <p>내용 줄줄이</p>
              <span>태그</span>
            </div>
            <div className={styles.boardItem_right}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
