// import { Editor } from "@toast-ui/react-editor";
// import colorPlugin from "@toast-ui/editor-plugin-color-syntax";
// import "@toast-ui/editor/dist/toastui-editor.css";
// import "tui-color-picker/dist/tui-color-picker.css";
// import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
// import styles from "./PostEditor.module.scss";
// import { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import { SERVER } from "../../util/Variables";
// import { useNavigate, useParams } from "react-router-dom";

// export const PostEditor = () => {
//   const editorRef = useRef();
//   const selectList = ["자유게시판", "공지사항", "Q&A"];

//   const [category, setCategory] = useState("자유게시판");
//   const [title, setTitle] = useState("");
//   const [tags, setTags] = useState("");
//   const [content, setContent] = useState("");
//   const [fileIds, setFileIds] = useState([]);
//   const [image, setImage] = useState([]);

//   const navigate = useNavigate();

//   const param = useParams();

//   const onChangeEditor = () => {
//     setContent(editorRef.current.getInstance().getHTML());
//   };

//   const onChangeHandler = (e) => {
//     setCategory(e.target.value);
//   };

//   const onChangeTitle = (e) => {
//     setTitle(e.target.value);
//   };

//   const onChangeTag = (e) => {
//     setTags(e.target.value);
//   };

//   const onSubmitHandler = (e) => {
//     e.preventDefault();
//     const categoryEng =
//       category === "자유게시판"
//         ? "FREE"
//         : category === "공지사항"
//         ? "NOTICE"
//         : "QNA";
//     const tag = tags.split(",").map((tag) => tag.trim());
//     const body = {
//       category: categoryEng,
//       title: title,
//       tags: tag,
//       content: content,
//       fileIds: fileIds,
//     };
//     if (category === "공지사항") {
//       alert("공지사항은 관리자만 작성할 수 있습니다.");
//       return;
//     }
//     if (param.id) {
//       axios
//         .patch(`${SERVER}/posts/${param.id}`, body, {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         })
//         .then((res) => {
//           navigate(`/posts/${param.id}`);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     } else {
//       axios
//         .post(`${SERVER}/posts`, body, {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         })
//         .then((res) => {
//           alert("게시글이 등록되었습니다.");
//           navigate(`/posts/${res.data.postId}`);
//         })
//         .catch((err) => {
//           console.log(err);
//           alert("게시글 등록에 실패했습니다.");
//         });
//     }
//   };

//   useEffect(() => {
//     if (param.id) {
//       axios
//         .get(`${SERVER}/posts/${param.id}`)
//         .then((res) => {
//           setTitle(res.data.data.title);
//           editorRef.current.getInstance().setHTML(res.data.data.content);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   }, [param.postId]);

//   const categoryRef = useRef();
//   const titleRef = useRef();
//   const tagRef = useRef();
//   // useEffect(() => {
//   //   console.log(editorRef.current);
//   //   if (editorRef.current) {
//   //     editorRef.current.getInstance().removeHook("addImageBlobHook");
//   //     editorRef.current
//   //       .getInstance()
//   //       .addHook("addImageBlobHook", (blob, callback) => {
//   //         (async () => {
//   //           if (blob.size > 5 * 1024 * 1024) {
//   //             alert("파일은 5MB 이하만 업로드 가능합니다.");
//   //             return;
//   //           }
//   //           const formData = new FormData();
//   //           formData.append("file", blob);
//   //           const res = await axios.post(`${SERVER}/files`, formData, {
//   //             headers: {
//   //               "Content-Type": "multipart/form-data",
//   //               Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//   //             },
//   //           });
//   //           setFileIds([...fileIds, res.data.remotePath]);
//   //           callback(res.data.remotePath, "alt text");
//   //         })();
//   //         return false;
//   //       });
//   //   }
//   // }, [editorRef.current]);

//   return (
//     <div className={styles.container}>
//       <div className={styles.postContainer}>
//         <h2> 카테고리 </h2>
//         <form className={styles.postForm}>
//           <select
//             className={styles.category}
//             onChange={onChangeHandler}
//             name="category"
//             defaultValue={category}
//             type="select"
//           >
//             {selectList.map((item) => (
//               <option value={item} key={item} defaultChecked={"자유게시판"}>
//                 {item}
//               </option>
//             ))}
//           </select>
//           <h2 ref={tagRef}> 태그 </h2>
//           <input
//             className={styles.title}
//             onChange={onChangeTag}
//             name="tag"
//             defaultValue={tags}
//             type="text"
//           />
//           <h2 ref={titleRef}> 제목 </h2>
//           <input
//             className={styles.title}
//             onChange={onChangeTitle}
//             name="title"
//             type="text"
//             defaultValue={title}
//           />
//           <h2> 내용 </h2>
//           <Editor
//             previewStyle="vertical"
//             height="600px"
//             width="400px"
//             initialEditType="wysiwyg"
//             initialValue="<p>커뮤니티 이용 매너를 지켜주세요 :)</p>"
//             useCommandShortcut={false}
//             onChange={onChangeEditor}
//             plugins={[colorPlugin]}
//             language="ko=KR"
//             ref={editorRef}
//             // hooks={{
//             //   addImageBlobHook: (blob, callback) => {
//             //     (async () => {
//             //       if (blob.size > 5 * 1024 * 1024) {
//             //         alert("파일은 5MB 이하만 업로드 가능합니다.");
//             //         return;
//             //       }
//             //       const formData = new FormData();
//             //       formData.append("file", blob);
//             //       const res = await axios.post(`${SERVER}/files`, formData, {
//             //         headers: {
//             //           "Content-Type": "multipart/form-data",
//             //           Authorization: `Bearer ${localStorage.getItem(
//             //             "accessToken"
//             //           )}`,
//             //         },
//             //       });
//             //       setFileIds([...fileIds, res.data.remotePath]);
//             //       callback(res.data.remotePath, "alt text");
//             //     })();
//             //     return false;
//             //   },
//             // }}
//           />
//         </form>
//         <div className={styles.btnContainer}>
//           <button className={styles.btn} onClick={onSubmitHandler}>
//             등록
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
