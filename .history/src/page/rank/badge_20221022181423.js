import {
  CommentOutlined,
  CrownTwoTone,
  EditOutlined,
  StarOutlined,
} from "@ant-design/icons";
import styles from "./rank.module.scss";

export const Badge = () => {
  return (
    <div className={styles.rankBox}>
      <div className={styles.left}>
        <img
          className={styles.avatar}
          src="https://avatars.githubusercontent.com/u/67794601?v=4"
          alt="avatar"
        />
      </div>
      <div className={styles.right}>
        <div className={styles.name}>이름</div>
        <div className={styles.status}>
          하하 난 존나 짱이야 최고야 멋있어 세상에서 제일 잘나가 지존이야
        </div>
        <div className={styles.pointList}>
          <div className={styles.pointContainer}>
            <StarOutlined />
            <span className={styles.point}>12</span>
          </div>
          <div className={styles.pointContainer}>
            <EditOutlined />
            <span className={styles.point}>12</span>
          </div>
          <div className={styles.pointContainer}>
            <CommentOutlined />
            <span className={styles.point}>12</span>
          </div>
        </div>
      </div>
      <div className={styles.rank}>
        <CrownTwoTone 
        twoToneColor={#eb2f96}/>
      </div>
    </div>
  );
};
