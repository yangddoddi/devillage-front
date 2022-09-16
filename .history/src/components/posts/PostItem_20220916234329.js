import styles from "./PostItem.module.scss";
import { EyeOutlined } from "@ant-design/icons";

export const PostItem = () => {
  return (
    <div className={styles.boardItem}>
      <div className={styles.boardItem_left}>
        <div className={styles.boardItem_left_top}>
          <h1>제가 한 코딩 보실 분 ㅋㅋ</h1>
          <p>지존 코딩 고수 ㄷ ㄷ</p>
        </div>
        <div className={styles.boardItem_left_bottom}>
          <span>#개발자</span>
          <br />
          <span>
            2022.10.23&nbsp;&nbsp;|&nbsp;&nbsp;
            <EyeOutlined />
            102
          </span>
        </div>
      </div>
      <div className={styles.boardItem_right}>
        <img src="/image/web.jpeg"></img>
      </div>
    </div>
  );
};
