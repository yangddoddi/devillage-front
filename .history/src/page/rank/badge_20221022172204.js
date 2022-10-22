import styles from "./rank.module.scss";

export const Badge = () => {
  return (
    <div className={styles.rankBox}>
      <div className={styles.rankTitle}>
        <h1>랭킹</h1>
      </div>
      <div className={styles.rankList}>
        <div className={styles.rankListTitle}>
          <img
            className={styles.avatar}
            src="../../../public/images/avatar.jpg"
            alt="avatar"
          />
        </div>
      </div>
    </div>
  );
};
