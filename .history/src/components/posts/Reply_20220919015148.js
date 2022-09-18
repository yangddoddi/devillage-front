import styles from "./Reply.module.scss";

export const Reply = ({ children }) => {
  return (
    <div className={styles.replyItem}>
      <div className={styles.replyTop}>
        <div className={styles.replyTopLeft}>
          <UserOutlined className={styles.replyAvatar} />
          <div className={styles.profileRight}>
            <p className={styles.author}>솔직한사람</p>
            <span>2022.09.07</span> · <span>수정</span> · <span>삭제</span>
          </div>
        </div>
        <div className={styles.replyTopRight}>
          <LikeOutlined className={styles.replyLikeBtn} />
          <div className={styles.replyLike}>13</div>
        </div>
      </div>
      <div className={styles.replyContent}>
        <p>대박 X신인 것 같긴 하네욤..</p>
      </div>
      {children}
    </div>
  );
};
