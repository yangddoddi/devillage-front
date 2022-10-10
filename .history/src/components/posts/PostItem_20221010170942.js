import styles from "./PostItem.module.scss";
import { EyeOutlined } from "@ant-design/icons";

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
          <p>{content}</p>
        </div>
        <div className={styles.boardItem_left_bottom}>
          {tags.map((item) => (
            <span>#{item.name} </span>
          ))}
          <br />
          <span>
            {createdAt.split("T")[0]} {createdAt.split("T")[1].split(".")[0]}
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
