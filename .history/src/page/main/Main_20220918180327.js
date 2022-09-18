import { PostItem } from "../../components/posts/PostItem";
import { PostsList } from "../../components/posts/PostsList";
import styles from "./Main.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export const Main = (props) => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);

  const param = useParams();

  const getPosts = async () => {
    setLoading(true);
    const result = await axios.get(
      `http://localhost:8080/posts?category=${props.category}?page=${page}&size=10`
    );
    setPosts(result.data.content);
    setTotal(result.data.totalElements);
    setLoading(false);
  };

  useEffect(() => {
    getPosts();
  }, [page, props.category]);

  return (
    <div className={styles.main}>
      <div className={styles.imgBox} />
      <div className={styles.bottomContainer}>
        <PostsList ListName={param}>
          {!loading &&
            posts.map((item) => (
              <PostItem
                key={item.id}
                id={item.id}
                title={item.title}
                tag={item.tag}
                content={item.content}
                photo={item.photo}
                createdAt={item.createdAt}
                view={item.view}
                category={item.category}
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
      <Link to="/posts">
        <EditOutlined className={styles.pencil} />
      </Link>
    </div>
  );
};
