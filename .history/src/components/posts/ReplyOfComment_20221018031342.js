import styles from "./ReplyOfComment.module.scss";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { SERVER } from "../../util/Variables";

export const ReplyOfComment = ({
  postId,
  reply,
  setReply,
  reComment,
  setReComment,
  replyOfComment,
  setRender,
}) => {
  const id = useSelector((state) => state.token.userId);
  const reCommentDeleteBtn = (e) => {
    axios
      .delete(
        `${SERVER}/posts/${postId}/comments/${reply.commentId}/${replyOfComment.reCommentId}`
      )
      .then((res) => {
        setRender((prev) => !prev);
        alert("댓글이 삭제되었습니다.");
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
            {reComment.userId == id ? (
              <span onClick={reCommentDeleteBtn} style={{ cursor: "pointer" }}>
                {" "}
                · 삭제
              </span>
            ) : null}
          </div>
        </div>
      </div>
      <div className={styles.replyOfCommentBottom}>
        <p>{reComment.content && reComment.content.replace(reg, " ")}</p>
      </div>
    </div>
  );
};
