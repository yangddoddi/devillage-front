import styles from "./PostItem.module.scss";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

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
  return (
    <div className={styles.boardItem}>
      <div className={styles.boardItem_left}>
        <div className={styles.boardItem_left_top}>
          <h1>{title}</h1>
          <p className={styles.content}>{content}</p>
        </div>
        <div className={styles.boardItem_left_bottom}>
          {tags.map((item) => (
            <span className={styles.tag} key={item.tagId}>
              #
              {item.tagName.length > 6
                ? item.tagName.substring(0, 6) + "..."
                : item.tagName}
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
