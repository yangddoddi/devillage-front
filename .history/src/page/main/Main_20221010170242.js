import { PostItem } from "../../components/posts/PostItem";
import { PostsList } from "../../components/posts/PostsList";
import styles from "./Main.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { SERVER } from "../../util/Variables";

export const Main = (props) => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [categoryName, setCategoryName] = useState("all");

  const [item, setItem] = useState({
    id: "",
    title: "",
    content: "",
    category: "",
    createdAt: "",
    userId: "",
    file: "",
    tag: [],
    clicks: "",
    lastModifiedAt: "",
  });

  const { category } = useParams();

  const getPosts = async () => {
    setLoading(true);
    const result = await axios.get(
      `${SERVER}/posts?category=${props.category}&page=${page}&size=10`
    );
    const post = result.data.data.map((item) => {
      return { item };
    });

    console.log(result.data);
    setPosts(post);
    setTotal(result.data.totalElements);

    console.log(posts);
    setLoading(false);
  };

  const changeCategoryName = () => {
    if (category === "notice") {
      setCategoryName("공지사항");
    } else if (category === "free") {
      setCategoryName("자유게시판");
    } else if (category === "all") {
      setCategoryName("최근 게시물");
    } else if (category === "qna") {
      setCategoryName("Q&A");
    }
  };

  useEffect(() => {
    getPosts();
    changeCategoryName();
  }, [page, props.category]);

  return (
    <div className={styles.main}>
      <div className={styles.imgBox} />
      <div className={styles.bottomContainer}>
        <PostsList ListName={categoryName}>
          {posts.map((item) => {
            console.log(item);
            console.log(item.item.id);
          })}
          {!loading &&
            posts.map((item) => (
              <PostItem
                key={item.item.id}
                id={item.item.id}
                title={item.item.title}
                content={item.item.content}
                category={item.item.category}
                createdAt={item.item.createdAt}
                userId={item.item.userId}
                file={item.item.file}
                clicks={item.item.clicks}
                lastModifiedAt={item.item.lastModifiedAt}
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
