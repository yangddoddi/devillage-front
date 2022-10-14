import styles from "./ReplyOfComment.module.scss";

export const ReplyOfComment = (
  { replyOfComment, setReplyOfComment, reply, setReply },
  props
) => {
  return (
    <div className={styles.replyOfComment}>
      <div className={styles.replyOfCommentTop}>
        <div className={styles.replyOfCommentTopLeft}>
          <div className={styles.profileRight}>
            <p className={styles.author}>착한사람</p>
            <span>2022.09.07</span> · <span>수정</span> · <span>삭제</span>
          </div>
        </div>
      </div>
      <div className={styles.replyOfCommentBottom}>
        <p>그래도 욕은 좀 심한 것 같네요..</p>
      </div>
    </div>
  );
};
