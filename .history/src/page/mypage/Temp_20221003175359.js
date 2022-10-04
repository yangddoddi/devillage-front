import styles from "./Temp.module.scss";

export const Temp = () => {
  return (
    <div className={styles.businessCard}>
      <div className={styles.businessCard__text}>
        <span className={styles.businessCard__text__left}>John Doe</span>
        <p className={styles.businessCard__text__right}>CEO</p>
      </div>
      <div className={styles.businessCard__text}>
        <span className={styles.businessCard__text__left}>John Doe</span>
        <p className={styles.businessCard__text__right}>CEO</p>
      </div>
      <div className={styles.businessCard__text}>
        <span className={styles.businessCard__text__left}>John Doe</span>
        <p className={styles.businessCard__text__right}>CEO</p>
      </div>
      <div className={styles.businessCard__text}>
        <span className={styles.businessCard__text__left}>John Doe</span>
        < className={styles.businessCard__text__right}>
          <span>CEO</span>
       <span>CEO</span></p>
      </div>
    </div>
  );
};
