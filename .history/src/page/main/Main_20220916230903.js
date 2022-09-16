import { PostItem } from "../../components/posts/PostItem";
import styles from "./Main.module.scss";

export const Main = () => {
  return (
    <div className={styles.main}>
      <div className={styles.imgBox} />
      <div className={styles.bottomContainer}>
        <div className={styles.title}>Recent Posts</div>
        <div className={styles.boardContainer}>
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
        </div>
      </div>
    </div>
  );
};
