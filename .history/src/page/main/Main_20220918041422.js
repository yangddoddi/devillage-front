import { PostItem } from "../../components/posts/PostItem";
import { PostsList } from "../../components/posts/PostsList";
import styles from "./Main.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from "antd";

export const Main = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);

  const getPosts = async () => {
    const result = await axios.get(
      `http://localhost:8080/posts?page=${page}&size=10`
    );
    setPosts(result.data.content);
    setTotal(result.data.totalElements);
    setLoading(false);
  };

  return (
    <div className={styles.main}>
      <div className={styles.imgBox} />
      <div className={styles.bottomContainer}>
        <PostsList ListName={"Recent Posts"}>
          {!loading &&
            posts.map((item) => (
              <PostItem
                key={item.id}
                id={item.id}
                title={item.title}
                tag={item.tag}
                content={item.content}
                category={item.category}
                thumbnail={item.thumbnail}
                photo={item.photo}
                createdAt={item.createdAt}
              />
            ))}
        </PostsList>
        <Pagination
          defaultCurrent={1}
          total={total}
          responsive={true}
          onChange={(page) => setPage(page)}
          style={{
            width: "100%",
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        />
      </div>
    </div>
  );
};
