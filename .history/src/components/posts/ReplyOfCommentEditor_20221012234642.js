import styles from "./ReplyOfCommentEditor.module.scss";
import { Editor } from "@toast-ui/react-editor";
import colorPlugin from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { SERVER } from "../../util/Variables";
import { useNavigate } from "react-router-dom";

export const ReplyOfCommentEditor = ({
  postId,
  reply,
  setReply,
  reComment,
  setReComment,
}) => {
  const onChangeEditor = () => {
    setContent(editorRef.current.getInstance().getHTML());
  };

  const editorRef = useRef();
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const onClickHandler = () => {
    axios
      .post(`${SERVER}/posts/${postId}/comments/${reply.commentId}`, {
        content: content,
      })
      .then((res) => {
        console.log(res);
        navigate(`/posts/${postId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.commentWriteContainer}>
      <h3>답글 작성</h3>
      <div className={styles.commentWrite}>
        <Editor
          previewStyle="vertical"
          initialEditType="wysiwyg"
          initialValue="<p>커뮤니티 이용 매너를 지켜주세요 :)</p>"
          useCommandShortcut={false}
          onChange={onChangeEditor}
          plugins={[colorPlugin]}
          language="ko=KR"
          ref={editorRef}
          className={styles.editor}
          height="200px"
        />
        <button className={styles.commentBtn} onClick={onClickHandler}>
          답글 작성
        </button>
      </div>
    </div>
  );
};
