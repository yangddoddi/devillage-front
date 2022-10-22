import {
  CommentOutlined,
  CrownTwoTone,
  EditOutlined,
  getTwoToneColor,
  setTwoToneColor,
  StarOutlined,
} from "@ant-design/icons";
import styles from "./rank.module.scss";

export const Badge = ({ user }) => {
  const ranking = user.ranking;
  const userId = user.userId;
  const nickname = user.nickname;
  const avatar = user.avatar.remotePath;
  const message = user.statusMessage;
  const point = user.point;
  const contents = user.contents;
  const comments = user.comments;
  console.log(avatar);

  return (
    <div className={styles.rankBox}>
      <div className={styles.left}>
        {!avatar && avatar.length > 0 ? (
          <img
            className={styles.avatar}
            src="https://avatars.githubusercontent.com/u/67794601?v=4"
            alt="avatar"
          />
        ) : (
          <img className={styles.avatar} src={avatar} alt="avatar" />
        )}
      </div>
      <div className={styles.right}>
        <div className={styles.name}>{nickname}</div>
        <div className={styles.status}>{message}</div>
        <div className={styles.pointList}>
          <div className={styles.pointContainer}>
            <StarOutlined />
            <span className={styles.point}>{point}</span>
          </div>
          <div className={styles.pointContainer}>
            <EditOutlined />
            <span className={styles.point}>{contents}</span>
          </div>
          <div className={styles.pointContainer}>
            <CommentOutlined />
            <span className={styles.point}>{comments}</span>
          </div>
        </div>
      </div>
      <div className={styles.rank}>
        <CrownTwoTone twoToneColor={"#ffed00"} />
      </div>
    </div>
  );
};
