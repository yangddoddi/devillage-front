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

export const PostView = () => {
  const [post, setPost] = useState({});
  const [like, setLike] = useState(false);
  const [bookMark, setBookMark] = useState(false);

  const param = new URLSearchParams(window.location.search);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/posts/${id}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onClickLikeBtnHandler = () => {
    axios
      .post(`http://localhost:8080/posts/${id}/like`)
      .then((res) => {
        console.log(res);
        setLike(!like);
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
                <p className={styles.author}>글쓴이</p>
                <span>2022.09.07</span> · <EyeOutlined />
                <span>127</span> · <span>원본</span>
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
                "<p>진짜 대박 아닌가요</p><p>나 혹시 코딩 신?</p><p>제가 아는 개발 언어는 html과 css입니다</p>"
              }
              bor
            />
            <div className={styles.contentBottomContainer}>
              <div className={styles.tagContainer}>
                <span className={styles.tag}>#코딩</span>
                <span className={styles.tag}>#천재</span>
                <span className={styles.tag}>#나자신</span>
              </div>
              <div className={styles.btnContainer}>
                <LikeOutlined
                  className={styles.likeBtn}
                  onClick={onClickLikeBtnHandler}
                />
                <div className={styles.like}>13</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.replyContainer}>
          <div className={styles.replyTitle}>댓글</div>
          <div className={styles.replyItem}>
            <div className={styles.replyProfile}>
              <div className={styles.replyProfileLeft}>
                <UserOutlined className={styles.replyAvatar} />

                <div className={styles.replyProfileRight}>
                  <p className={styles.replyAuthor}>글쓴이</p>
                  <span>2022.09.07</span>

                  <div className={styles.replyContent}>
                    <p>코딩 신이 아니라 코딩 X신 같은데욤..</p>

                    <div className={styles.replyBtnContainer}>
                      <LikeOutlined className={styles.replyLikeBtn} />
                      <div className={styles.replyLike}>13</div>

                      <div className={styles.replyReplyBtn}>답글</div>

                      <div className={styles.replyDeleteBtn}>삭제</div>

                      <div className={styles.replyEditBtn}>수정</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
