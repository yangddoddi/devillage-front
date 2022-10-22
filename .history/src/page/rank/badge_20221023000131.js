import {
  CommentOutlined,
  CrownTwoTone,
  EditOutlined,
  getTwoToneColor,
  setTwoToneColor,
  StarOutlined,
  TrophyTwoTone,
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

  function Rank() {
    switch (ranking) {
      case 1:
        return <CrownTwoTone twoToneColor="#FFD700" />;
      case 2:
        return <CrownTwoTone twoToneColor="#C0C0C0" />;
      case 3:
        return <CrownTwoTone twoToneColor="#CD7F32" />;
      case 4:
        return <TrophyTwoTone twoToneColor="#C0C0C0" />;
      case 11:
        return null;
      default:
        return null;
    }
  }

  return (
    <div className={styles.rankBox}>
      <div className={styles.left}>
        {!avatar ? (
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
        <Rank className={styles.rankIcon} user={user} />
      </div>
    </div>
  );
};
