import styles from "./ReplyEditor.module.scss";
import { Editor } from "@toast-ui/react-editor";
import colorPlugin from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { SERVER } from "../../util/Variables";
import { useParams } from "react-router-dom";

export const ReplyEditor = ({ postId }) => {
  const onChangeEditor = () => {
    setContent(editorRef.current.getInstance().getHTML());
  };

  const editorRef = useRef();
  const [content, setContent] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        `${SERVER}/posts/${postId}/comments`,
        {
          content: content,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        axios.get(`${SERVER}/posts/${postId}`).then((res) => {
          setContent("");
          editorRef.current.getInstance().setHTML("");
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.commentWriteContainer}>
      <h2>댓글 작성</h2>
      <div className={styles.commentWrite}>
        <Editor
          previewStyle="vertical"
          initialEditType="wysiwyg"
          initialValue="<p>커뮤니티 이용 매너를 지켜주세요 :)</p>"
          useCommandShortcut={false}
          onChange={onChangeEditor}
          plugins={[colorPlugin]}
          styles={{ height: "800px" }}
          language="ko=KR"
          toolbarItems={[]}
          ref={editorRef}
          className={styles.editor}
          hooks={{
            addImageBlobHook: (blob, callback) => {
              const formData = new FormData();
              formData.append("image", blob);
              axios
                .post(`${SERVER}/posts/${postId}/images`, formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                })
                .then((res) => {
                  callback(res.data.url, "alt text");
                })
                .catch((err) => {
                  console.log(err);
                });
            },
          }}
        />
        <button className={styles.commentBtn} onClick={onSubmitHandler}>
          댓글 작성
        </button>
      </div>
    </div>
  );
};
