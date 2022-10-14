import styles from "./ReplyOfComment.module.scss";
import { useSelector } from "react-redux";

export const ReplyOfComment = ({
  postId,
  reply,
  setReply,
  reComment,
  setReComment,
  replyOfComment,
}) => {
  useSelec;
  console.log(reComment);
  const reg = /<[^>]*>?/g;
  return (
    <div className={styles.replyOfComment}>
      <div className={styles.replyOfCommentTop}>
        <div className={styles.replyOfCommentTopLeft}>
          <div className={styles.profileRight}>
            <p className={styles.author}>{reComment.nickname}</p>
            <span>
              {reComment.createdAt && reComment.createdAt.split("T")[0]}
            </span>{" "}
            · {reComment.userId == reply.userId ? <span>수정</span> : null} ·
            <span>삭제</span>
          </div>
        </div>
      </div>
      <div className={styles.replyOfCommentBottom}>
        <p>{reComment.content && reComment.content.replace(reg, " ")}</p>
      </div>
    </div>
  );
};
