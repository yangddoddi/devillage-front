import { PostItem } from "../../components/posts/PostItem";
import { PostsList } from "../../components/posts/PostsList";
import styles from "./Main.module.scss";

export const Main = () => {
  return (
    <div className={styles.main}>
      <div className={styles.imgBox} />
      <div className={styles.bottomContainer}>
        <div className={styles.title}>Recent Posts</div>
        <PostsList ListName={"Recent Posts"} />
      </div>
    </div>
  );
};
