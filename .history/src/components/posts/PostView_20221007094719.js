import React from "react";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";
import axios from "axios";
import { Location } from "react-router-dom";
import styles from "./PostView.module.scss";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { LikeOutlined, UserOutlined } from "@ant-design/icons";
import { BookOutlined } from "@ant-design/icons";
import { EyeOutlined } from "@ant-design/icons";
import { Reply } from "./Reply";
import { ReplyOfComment } from "./ReplyOfComment";
import { Editor } from "@toast-ui/react-editor";
import colorPlugin from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import { useRef } from "react";
import { ReplyEditor } from "./ReplyEditor";
import { SERVER } from "../../util/Variables";

export const PostView = () => {
  const [post, setPost] = useState({});
  const [like, setLike] = useState(false);
  const [bookMark, setBookMark] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const { id } = useParams();

  const editorRef = useRef();
  const [content, setContent] = useState("");

  const onChangeEditor = () => {
    setContent(editorRef.current.getInstance().getHTML());
  };

  useEffect(() => {
    axios
      .get(`http://${SERVER}/api/posts/${id}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onClickLikeBtnHandler = () => {
    axios
      .post(`http://${SERVER}/posts/${id}/like`)
      .then((res) => {
        setLike(!like);
        setLikeCount(res.data.like);
        if (like) {
          alert("좋아요 취소");
        } else {
          alert("좋아요");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onClickBookmarkHandler = () => {
    axios
      .post(`http://localhost:8080/posts/${id}/bookmark`)
      .then((res) => {
        console.log(res);
        setBookMark(!bookMark);
        if (bookMark) {
          alert("북마크를 해제했습니다.");
        } else {
          alert("북마크를 했습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   axios
  //     .get(`http://localhost:8080/posts/${id}`)
  //     .then((res) => {
  //       setPost(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  return (
    <>
      {/* <h2 className={styles.title}>{post.title}</h2>
      <div className={styles.tag}>{post.tag}</div>
      <Viewer initialValue={post.content} /> */}
      <div className={styles.container}>
        <div className={styles.postContainer}>
          <h1 className={styles.category}>자유게시판</h1>
          <div className={styles.topContainer}>
            <div className={styles.titleContainer}>
              <h2 className={styles.title}>
                님들 제가 한 코딩 보실래요? ㄷ ㄷ
              </h2>
            </div>
            <div className={styles.profile}>
              <div className={styles.profileLeft}>
                <UserOutlined className={styles.avatar} />
              </div>
              <div className={styles.profileRight}>
                <p className={styles.author}>X신</p>
                <span>2022.09.07</span> · <EyeOutlined />
                <span>127</span> · <span>수정됨</span>
              </div>
              <BookOutlined
                className={styles.bookMark}
                onClick={onClickBookmarkHandler}
              />
            </div>
          </div>
          <div className={styles.contentContainer}>
            <Viewer
              initialValue={
                "<p>저 클론코딩 하나 만듦 ㄷ ㄷ</p><p>나 혹시 코딩 신?</p><p>참고로 제가 다룰 수 있는 개발 언어는 html과 css입니다</p>"
              }
              bor
            />
            <div className={styles.contentBottomContainer}>
              <div className={styles.tagContainer}>
                <span className={styles.tag}>#코딩</span>
                <span className={styles.tag}>#지존</span>
                <span className={styles.tag}>#네카쿠배라당토</span>
                <span className={styles.tag}>#SSAP가능</span>
              </div>
              <div className={styles.btnContainer}>
                <LikeOutlined
                  className={styles.likeBtn}
                  onClick={onClickLikeBtnHandler}
                />
                <div className={styles.like} onClick={onClickLikeBtnHandler}>
                  {likeCount}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.replyContainer}>
          <h2>댓글 2개</h2>
          <Reply>
            <ReplyOfComment />
          </Reply>
        </div>
        <ReplyEditor />
      </div>
    </>
  );
};
