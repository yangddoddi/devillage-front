import { LikeOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./Reply.module.scss";
import { Editor } from "@toast-ui/react-editor";
import colorPlugin from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import { useRef } from "react";
import { useState } from "react";
import { ReplyOfComment } from "./ReplyOfComment";
import { ReplyEditor } from "./ReplyEditor";
import { ReplyOfCommentEditor } from "./ReplyOfCommentEditor";
import axios from "axios";

export const Reply = ({ children, postId, reply }) => {
  const [replyOfComment, setReplyOfComment] = useState(false);

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
            <p className={styles.author}>{reply.userId}</p>
            <span>{reply.createdAt.split("T")[0]}</span> · <span>수정</span> ·{" "}
            <span>삭제</span> ·{" "}
            <span onClick={onClickReplyOfCommentBtnHandler}>답글</span>
          </div>
        </div>
        <div className={styles.replyTopRight}>
          <LikeOutlined className={styles.replyLikeBtn} />
          <div className={styles.replyLike}>10</div>
        </div>
      </div>
      <div className={styles.replyContent}>
        <p>{reply.content}</p>
      </div>
      <div className={styles.replyOfCommentContainer}>{children}</div>
      {replyOfComment && <ReplyOfCommentEditor />}
    </div>
  );
};
