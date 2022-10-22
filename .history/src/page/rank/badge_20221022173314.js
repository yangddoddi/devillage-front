import styles from "./rank.module.scss";

export const Badge = () => {
  return (
    <div className={styles.rankBox}>
      <div className={styles.left}>
        <img
          className={styles.avatar}
          src="https://avatars.githubusercontent.com/u/67794601?v=4"
          alt="avatar"
        />
      </div>
      <div className={styles.right}>
        <div className={styles.name}>이름</div>
        <div className={styles.status}>
          하하 난 존나 짱이야 최고야 멋있어 세상에서 제일 잘나가 지존이야
        </div>
      </div>
    </div>
  );
};
