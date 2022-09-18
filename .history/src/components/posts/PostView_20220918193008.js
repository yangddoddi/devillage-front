import React from "react";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";
import axios from "axios";
import { Location } from "react-router-dom";
import styles from "./PostView.module.scss";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const PostView = () => {
  const [post, setPost] = useState({});

  const param = new URLSearchParams(window.location.search);
  const { id } = useParams();

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
        <div className={styles.topContainer}>
          <div className={styles.avatar}></div>
          <div className={styles.profile}>
            <p>글쓴이</p>
            <span>올린 날짜</span>
            <span>조회수</span>
            <span>수정여부</span>
          </div>
        </div>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>제목</h2>
        </div>
        <div className={styles.contentContainer}>
          <Viewer initialValue={"ㅎㅎ"} />
        </div>
      </div>
    </>
  );
};
