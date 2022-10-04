import styles from "./Temp.module.scss";

export const Temp = () => {
  return (
    <div className={styles.businessCard}>
      <div className={styles.businessCard__text}>
        <span className={styles.businessCard__text__left}>주소</span>
        <p className={styles.businessCard__text__right}>
          1공장: 대구광역시 동구 동호로 7길 58 1층
        </p>
      </div>
      <div className={styles.businessCard__text}>
        <span className={styles.businessCard__text__left}>TEL</span>
        <p className={styles.businessCard__text__right}>053-964-2101</p>
      </div>
      <div className={styles.businessCard__text}>
        <span className={styles.businessCard__text__left}>John Doe</span>
        <p className={styles.businessCard__text__right}>CEO</p>
      </div>
      <div className={styles.businessCard__text}>
        <span className={styles.businessCard__text__left}>John Doe</span>
        <p className={styles.businessCard__text__right}>
          <span>CEO</span>
          <span>CEO</span>
        </p>
      </div>
    </div>
  );
};
