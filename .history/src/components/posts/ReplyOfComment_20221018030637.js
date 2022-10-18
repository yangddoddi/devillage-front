import styles from "./ReplyOfComment.module.scss";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";

export const ReplyOfComment = ({
  postId,
  reply,
  setReply,
  reComment,
  setReComment,
  replyOfComment,
}) => {
  const id = useSelector((state) => state.token.userId);
  // const reCommentDeleteBtn = (e) => {

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
              <span onClick={reCommentDeleteBtn}> · 삭제</span>
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
