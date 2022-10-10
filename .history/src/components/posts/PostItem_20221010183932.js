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
  console.log(
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
    tags
  );
  const navigate = useNavigate();
  const postClickHandler = () => {
    navigate(`/posts/${id}`);
  };

  const reg = /<[^>]*>?/g

  return (
    <div className={styles.boardItem} onClick={postClickHandler}>
      <div className={styles.boardItem_left}>
        <div className={styles.boardItem_left_top}>
          <h1>{title.length > 20 ? title.substring(0, 20) + "..." : title}</h1>
          <p className={styles.content}>
            {content.
            {content.length > 100 ? content.substring(0, 100) + "..." : content}
          </p>
        </div>
        <div className={styles.boardItem_left_bottom}>
          {tags.map((item) => (
            <span className={styles.tag} key={item.tagId}>
              #
              {item.name.length > 10
                ? item.name.slice(0, 10) + "... "
                : item.name + " "}
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
        <img src="/image/web.jpeg"></img>
      </div>
    </div>
  );
};
