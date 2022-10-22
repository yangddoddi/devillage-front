import styles from "./rank.module.scss";

export const Badge = () => {
  return (
    <div className={styles.rankBox}>
      <div className={styles.rankList}>
        <img
          className={styles.avatar}
          src="https://avatars.githubusercontent.com/u/67794601?v=4"
          alt="avatar"
        />
      </div>
    </div>
  );
};
