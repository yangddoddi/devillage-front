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

export const Reply = ({ children }) => {
  const onChangeEditor = () => {
    setContent(editorRef.current.getInstance().getHTML());
  };

  const editorRef = useRef();
  const [content, setContent] = useState("");

  return (
    <div className={styles.replyItem}>
      <div className={styles.replyTop}>
        <div className={styles.replyTopLeft}>
          <UserOutlined className={styles.replyAvatar} />
          <div className={styles.profileRight}>
            <p className={styles.author}>솔직한사람</p>
            <span>2022.09.07</span> · <span>수정</span> · <span>삭제</span> ·{" "}
            <span>답글</span>
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
      <div className={styles.replyOfCommentContainer}>{children}</div>
      <ReplyOfCommentEditor />
    </div>
  );
};
