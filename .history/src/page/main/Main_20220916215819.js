import styles from "./Main.module.scss";

export const Main = () => {
  return (
    <div className={styles.main}>
      <div className={styles.imgBox} />
    </div>
    <div className={styles.board}></div>
  );
};
