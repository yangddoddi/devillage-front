import styles from "./PostItem.module.scss";
import { EyeOutlined } from "@ant-design/icons";

export const PostItem = () => {
  return (
    <div className={styles.boardItem}>
      <div className={styles.boardItem_left}>
        <div className={styles.boardItem_left_top}>
          <h1>제가 한 코딩 보실 분 ㅋㅋ</h1>
          <p>
            진짜 대단하지 않나요 저 이러다가 구글에서 부르면 어떡하죠 영어도
            못하는데 ㅋㅋ 아
          </p>
        </div>
        <div className={styles.boardItem_left_bottom}>
          <span>#헛소리</span>
          2022.10.23
          <EyeOutlined />
          102
        </div>
      </div>
      <div className={styles.boardItem_right}>
        <img src="/image/web.jpeg"></img>
      </div>
    </div>
  );
};
