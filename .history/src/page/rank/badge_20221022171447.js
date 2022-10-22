import styles from "./rank.module.scss";

export const Badge = () => {
  return (
    <div className={styles.rankBox}>
      <div className={styles.rankTitle}>
        <h1>랭킹</h1>
      </div>
      <div className={styles.rankList}>
        <div className={styles.rankListTitle}>
          <div className={styles.rankListTitleRank}>랭킹</div>
          <div className={styles.rankListTitleName}>이름</div>
          <div className={styles.rankListTitlePoint}>포인트</div>
        </div>
      </div>
    </div>
  );
};
