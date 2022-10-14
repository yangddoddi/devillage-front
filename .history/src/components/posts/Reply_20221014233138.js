import { LikeOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./Reply.module.scss";
import { Editor } from "@toast-ui/react-editor";
import colorPlugin from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { ReplyOfComment } from "./ReplyOfComment";
import { ReplyEditor } from "./ReplyEditor";
import { ReplyOfCommentEditor } from "./ReplyOfCommentEditor";
import axios from "axios";

export const Reply = ({
  children,
  postId,
  reply,
  setReply,
  reComment,
  setReComment,
}) => {
  const [replyOfComment, setReplyOfComment] = useState(false);

  console.log(reComment);
  const onChangeEditor = () => {
    setContent(editorRef.current.getInstance().getHTML());
  };

  const editorRef = useRef();
  const [content, setContent] = useState("");

  const onClickReplyOfCommentBtnHandler = () => {
    setReplyOfComment(!replyOfComment);
  };

  const reg = /<[^>]*>?/g;

  return (
    <div className={styles.replyItem}>
      <div className={styles.replyTop}>
        <div className={styles.replyTopLeft}>
          <UserOutlined className={styles.replyAvatar} />
          <div className={styles.profileRight}>
            <p className={styles.author}>{reply.nickname}</p>
            <span>
              {reply.createdAt && reply.createdAt.split("T")[0]}
            </span> · <span>수정</span> · <span>삭제</span> ·{" "}
            <span onClick={onClickReplyOfCommentBtnHandler}>답글</span>
          </div>
        </div>
        <div className={styles.replyTopRight}>
          <LikeOutlined className={styles.replyLikeBtn} />
          <div className={styles.replyLike}>10</div>
        </div>
      </div>
      <div className={styles.replyContent}>
        <p>{reply.content && reply.content.replace(reg, " ")}</p>
      </div>
      {/* <div className={styles.replyOfCommentContainer}>{children}</div> */}
      {reComment &&
        reComment.filter((item) => item.reCommentId === reply.id).length >
          0 && (
          <div className={styles.replyOfCommentContainer}>
            {reComment &&
              reComment
                .filter(
                  (item) =>
                    item.comments.commentId ===
                    item.comments.reComments.parentCommentId
                )
                .map((item) => (
                  <ReplyOfComment
                    key={item.reCommentId}
                    postId={postId}
                    reply={reply}
                    setReply={setReply}
                    reComment={reComment}
                    setReComment={setReComment}
                    replyOfComment={item}
                  />
                ))}
          </div>
        )}
      {replyOfComment && (
        <ReplyOfCommentEditor
          postId={postId}
          reComment={reComment}
          setReComment={setReComment}
          reply={reply}
          setReply={setReply}
        />
      )}
    </div>
  );
};
