import styles from "./Main.module.scss";

export const Main = () => {
  return (
    <div className={styles.main}>
      <div className={styles.imgBox} />

      <div className={styles.bottomContainer}>
        <div className={styles.title}>전체 글 보기</div>
        <div className={styles.boardContainer}>
          <table className={styles.board}>
            <tr>
              <th className={styles.column}>No</th>
              <th className={styles.column}></th>
              <th className={styles.column}></th>
              <th className={styles.column}></th>
              <th className={styles.column}></th>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};
