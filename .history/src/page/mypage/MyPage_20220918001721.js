import styles from "./MyPage.module.scss";

export const MyPage = () => {
  return (
    <div className={styles.myPage}>
      <ul className={styles.myPageList}>
        <li>MyPage</li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
};
