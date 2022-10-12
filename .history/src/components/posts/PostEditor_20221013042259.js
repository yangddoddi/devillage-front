import { Editor } from "@toast-ui/react-editor";
import colorPlugin from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import styles from "./PostEditor.module.scss";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { SERVER } from "../../util/Variables";
import { useNavigate, useParams } from "react-router-dom";

export const PostEditor = () => {
  const editorRef = useRef();
  const selectList = ["자유게시판", "공지사항", "Q&A"];

  const [category, setCategory] = useState("자유게시판");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");

  const [editTitle, setEditTitle] = useState("");
  const [editTags, setEditTags] = useState("");
  const [editCategory, setEditCategory] = useState("");

  const navigate = useNavigate();

  const param = useParams();

  const onChangeEditor = () => {
    setContent(editorRef.current.getInstance().getHTML());
  };

  const onChangeHandler = (e) => {
    setCategory(e.target.value);
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeTag = (e) => {
    setTags(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const categoryEng =
      category === "자유게시판"
        ? "FREE"
        : category === "공지사항"
        ? "NOTICE"
        : "QNA";
    const tag = tags.split(",").map((tag) => tag.trim());
    const body = {
      category: categoryEng,
      title: title,
      tags: tag,
      content: content,
    };

    axios
      .post(`${SERVER}/posts`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(category);
        console.log(res);
        alert("게시글이 등록되었습니다.");
        navigate(`/posts/${res.data.postId}`);
      })
      .catch((err) => {
        console.log(err);
        alert("게시글 등록에 실패했습니다.");
      });
  };

  useEffect(() => {
    if (param.id) {
      axios
        .get(`${SERVER}/posts/${param.id}`)
        .then((res) => {
          console.log(res);
          if (tagRef.current.value) {
            tagRef.current.value = res.data.data.tags.join(", ");
          }
          // categoryRef.current.value = res.data.category;
          titleRef.current.value = res.data.data.title;
          editorRef.current.getInstance().setHTML(res.data.data.content);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [param.postId]);

  const categoryRef = useRef();
  const titleRef = useRef();
  const tagRef = useRef();

  return (
    <div className={styles.container}>
      <div className={styles.postContainer}>
        <h2> 카테고리 </h2>
        <form className={styles.postForm}>
          <select
            className={styles.category}
            onChange={onChangeHandler}
            name="category"
            type="select"
          >
            {selectList.map((item) => (
              <option value={item} key={item} defaultChecked={"자유게시판"}>
                {item}
              </option>
            ))}
          </select>
          <h2 ref={tagRef}> 태그 </h2>
          <input
            className={styles.title}
            onChange={onChangeTag}
            name="tag"
            type="text"
          />
          <h2 ref={titleRef}> 제목 </h2>
          <input
            className={styles.title}
            onChange={onChangeTitle}
            name="title"
            type="text"
          />
          <h2> 내용 </h2>
          <Editor
            previewStyle="vertical"
            height="600px"
            width="400px"
            initialEditType="wysiwyg"
            initialValue="<p>커뮤니티 이용 매너를 지켜주세요 :)</p>"
            useCommandShortcut={false}
            onChange={onChangeEditor}
            plugins={[colorPlugin]}
            language="ko=KR"
            ref={editorRef}
          />
        </form>
        <div className={styles.btnContainer}>
          <button className={styles.btn} onClick={onSubmitHandler}>
            등록
          </button>
        </div>
      </div>
    </div>
  );
};
