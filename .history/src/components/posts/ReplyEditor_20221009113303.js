import styles from "./ReplyEditor.module.scss";
import { Editor } from "@toast-ui/react-editor";
import colorPlugin from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import { useRef } from "react";
import { useState } from "react";

export const ReplyEditor = () => {
  // const onChangeEditor = () => {
  //   setContent(editorRef.current.getInstance().getHTML());
  // };

  const editorRef = useRef();
  const [content, setContent] = useState("");

  return (
    <div className={styles.commentWriteContainer}>
      <h2>댓글 작성</h2>
      <div className={styles.commentWrite}>
        <Editor
          previewStyle="vertical"
          initialEditType="wysiwyg"
          initialValue="<p>커뮤니티 이용 매너를 지켜주세요 :)</p>"
          useCommandShortcut={false}
          // onChange={onChangeEditor}
          plugins={[colorPlugin]}
          language="ko=KR"
          ref={editorRef}
          className={styles.editor}
        />
        <button className={styles.commentBtn}>댓글 작성</button>
      </div>
    </div>
  );
};
