import styles from "./Main.module.scss";

export const Main = () => {
  return (
    <div className={styles.main}>
      <div className={styles.imgBox} />

      <div className={styles.mainBoard}>
        <div className={styles.title}>전체 글 보기</div>
        <div className={styles.board}></div>
      </div>
    </div>
  );
};
