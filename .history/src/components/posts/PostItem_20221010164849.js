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
    lastModifiedAt
  );
  return (
    <div className={styles.boardItem}>
      <div className={styles.boardItem_left}>
        <div className={styles.boardItem_left_top}>
          <h1>{title}</h1>
          <p>{content}</p>
        </div>
        <div className={styles.boardItem_left_bottom}>
          <span>태그태그</span>
          <br />
          <span>
            {createdAt}&nbsp;&nbsp;|&nbsp;&nbsp;
            <EyeOutlined />
            뷰뷰
          </span>
        </div>
      </div>
      <div className={styles.boardItem_right}>
        <img src="/image/web.jpeg"></img>
      </div>
    </div>
  );
};
