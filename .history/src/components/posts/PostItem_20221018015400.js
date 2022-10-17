import styles from "./PostItem.module.scss";
import { EyeOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

export const PostItem = ({
  key,
  id,
  title,
  content,
  category,
  createdAt,
  userId,
  file,
  clicks,
  lastModifiedAt,
  tags,
}) => {
  const navigate = useNavigate();
  const postClickHandler = () => {
    navigate(`/posts/${id}`);
  };

  const reg = /<[^>]*>?/g;

  const clickTagHandler = (e) => {
    navigate(`/tag/${e.target.innerText.slice(1)}`);
  };

  return (
    <div className={styles.boardItem}>
      <div className={styles.boardItem_left}>
        <div className={styles.boardItem_left_top}>
          <h1 onClick={postClickHandler}>
            {title.length > 20 ? title.substring(0, 20) + "..." : title}
          </h1>
          <p onClick={postClickHandler} className={styles.content}>
            {content.replace(reg, "").length > 100
              ? content.replace(reg, "").substring(0, 100) + "..."
              : content.replace(reg, "")}
          </p>
        </div>
        <div className={styles.boardItem_left_bottom}>
          {tags.map((item) => (
            <span
              className={styles.tag}
              key={item.tagId}
              onClick={clickTagHandler}
            >
              #{item.name}&nbsp;
            </span>
          ))}
          <br />
          <span>
            {createdAt != null && createdAt.split("T")[0]}{" "}
            {createdAt != null && createdAt.split("T")[1].split(".")[0]}
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <EyeOutlined />
            {clicks}
          </span>
        </div>
      </div>
      <div className={styles.boardItem_right}>
        <img src="/image/web.jpeg" onClick={postClickHandler}></img>
      </div>
    </div>
  );
};
