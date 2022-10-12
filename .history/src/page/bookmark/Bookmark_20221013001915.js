import { PostItem } from "../../components/posts/PostItem";
import { PostsList } from "../../components/posts/PostsList";
import styles from "./Bookmark.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { SERVER } from "../../util/Variables";

export const Bookmark = (props) => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios.get(`${SERVER}/posts/bookmark?page=${page}&size=10`).then((res) => {
      console.log(res);
      setPosts(res.data.posts);
      setTotal(res.data.total);
      setLoading(false);
    });
  }, [page]);

  const onChangeHandler = (page) => {
    setPage(page);
  };

  return (
    <div className={styles.main}>
      <div className={styles.imgBox} />
      <div className={styles.bottomContainer}>
        <PostsList ListName={props.category}>
          {!loading && posts ? (
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
            ))
          ) : (
            <div className={styles.noPost}>No Post</div>
          )}
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
