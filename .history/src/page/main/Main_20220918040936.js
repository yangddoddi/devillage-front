import { PostItem } from "../../components/posts/PostItem";
import { PostsList } from "../../components/posts/PostsList";
import styles from "./Main.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";

export const Main = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.main}>
      <div className={styles.imgBox} />
      <div className={styles.bottomContainer}>
        <PostsList ListName={"Recent Posts"}>
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
          <PostItem />
        </PostsList>
      </div>
    </div>
  );
};
