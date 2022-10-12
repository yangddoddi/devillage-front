import React, { Component } from "react";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";
import axios from "axios";
import { Link, Location } from "react-router-dom";
import styles from "./PostView.module.scss";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { EditOutlined, LikeOutlined, UserOutlined } from "@ant-design/icons";
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
import { LikeFilled } from "@ant-design/icons";
import { BookFilled } from "@ant-design/icons";
import { AlertOutlined } from "@ant-design/icons";
import { Pagination } from "antd";
import { useSelector } from "react-redux";

export const PostView = () => {
  const [post, setPost] = useState({});
  const [likeCount, setLikeCount] = useState(0);

  const [key, setKey] = useState(0);
  const [category, setCategory] = useState("자유게시판");
  const [clicks, setClicks] = useState(0);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [isModified, setIsModified] = useState(false);
  const [reply, setReply] = useState([]);
  const [replyCount, setReplyCount] = useState(0);
  const [postLike, setPostLike] = useState(false);
  const [bookmarkLike, setBookmarkLike] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const [reportReason, setReportReason] = useState(1);
  const [reportContent, setReportContent] = useState("");
  const [reComment, setReComment] = useState([]);
  const [userId, setUserId] = useState("");

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const { id } = useParams();

  const editorRef = useRef();

  const selector = useSelector((state) => state.userId);

  const onChangeEditor = () => {
    setContent(editorRef.current.getInstance().getHTML());
  };

  useEffect(() => {
    axios
      .get(`${SERVER}/posts/${id}`, {
        headers: {
          Authorization: `Bearer ` + localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        console.log(res);
        const data = res.data.data;
        const tag = data.tag.map((tag) => tag);
        const time = data.createdAt.split("T")[0];
        setKey(data.key);
        setCategory(data.category);
        setTitle(data.title);
        setTags(tag);
        setAuthor(data.author.authorName);
        setContent(data.content);
        setCreatedAt(time);
        setIsModified(data.modified);
        setClicks(data.clicks);
        setPostLike(data.postLike);
        setBookmarkLike(data.bookmarkLike);
        setLikeCount(data.like);
        setUserId(data.author.authorId);
        // Comment 필요
        // viewRef.current.props.initialValue = data.content;
        viewRef.current.getInstance().setMarkdown(data.content);

        setTotal(data.comments.pageInfo.totalPages);
        setPage(data.comments.pageInfo.page);
        setReplyCount(data.comments.pageInfo.totalElements);
        setReply(data.comments.data);

        const reply = data.comments.data;
        const reComment = reply.map((reply) => reply.reComments);

        setReComment(reComment);
        console.log(userId);
        console.log(selector);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // useEffect(() => {
  //   axios
  //     .get(`${SERVER}/posts/${id}/comments`)
  //     .then((res) => {
  //       console.log(res);
  //       const data = res.data.data;
  //       setReply(data);
  //       setReplyCount(data.pageInfo.totalElements);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [id]);

  useEffect(() => {
    axios
      .get(`${SERVER}/api/posts/${id}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onClickLikeBtnHandler = () => {
    axios
      .post(`${SERVER}/posts/${id}/like`)
      .then((res) => {
        setPostLike(!postLike);
        setLikeCount(res.data.like);
        if (postLike) {
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
      .post(`${SERVER}/posts/${id}/bookmark`)
      .then((res) => {
        console.log(res);
        setBookmarkLike(!bookmarkLike);
        if (bookmarkLike) {
          alert("북마크를 해제했습니다.");
        } else {
          alert("북마크를 했습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onClickReportBtn = () => {
    setReportModal(!reportModal);
  };

  const viewRef = useRef();

  const onChangeReportSelect = (e) => {
    setReportReason(e.target.value);
  };

  const onChangeReportContent = (e) => {
    setReportContent(e.target.value);
  };

  const submitReport = () => {
    axios
      .post(
        `${SERVER}/posts/${id}/report`,
        {
          reportType: reportReason,
          content: reportContent,
        },
        {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        alert("신고가 접수되었습니다.");
        setReportModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onClickXBtn = () => {
    setReportModal(false);
  };

  const onChangePage = (e) => {
    setPage(e);
    axios
      .get(`${SERVER}/posts/${id}/comments?page=${e}&size=10`)
      .then((res) => {
        console.log(res);
        const data = res.data.data;
        setReply(data);
        setReplyCount(data.pageInfo.totalElements);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.postContainer}>
          <h1 className={styles.category}>자유게시판</h1>
          <div className={styles.topContainer}>
            <div className={styles.titleContainer}>
              <h2 className={styles.title}>{title}</h2>
            </div>
            <div className={styles.profile}>
              <div className={styles.profileLeft}>
                <UserOutlined className={styles.avatar} />
              </div>
              <div className={styles.profileRight}>
                <p className={styles.author}>{author}</p>
                <span>{createdAt}</span> · <EyeOutlined />
                <span>{clicks}</span> ·{" "}
                <span>{isModified ? "수정됨" : "원본"}</span>
                {userId == localStorage.getItem("userId") ? (
                  <Link to={`/post/${id}/edit`}>
                    <EditOutlined className={styles.editIcon} />
                  </Link>
                ) : null}
              </div>
              {!bookmarkLike ? (
                <BookOutlined
                  className={styles.bookMark}
                  onClick={onClickBookmarkHandler}
                />
              ) : (
                <BookFilled
                  style={{ color: "#4cb1fa" }}
                  className={styles.bookMark}
                  onClick={onClickBookmarkHandler}
                />
              )}
            </div>
          </div>
          <div className={styles.contentContainer}>
            <Viewer initialValue={content} ref={viewRef} />
            <div className={styles.contentBottomContainer}>
              <div className={styles.tagContainer}>
                {tags.length != 0 &&
                  tags.map((tag) => (
                    <span className={styles.tag} key={tag.tagId}>
                      #{tag.name}
                    </span>
                  ))}
              </div>
              <div className={styles.btnContainer}>
                {postLike ? (
                  <LikeFilled
                    style={{ color: "#4cb1fa" }}
                    onClick={onClickLikeBtnHandler}
                    className={styles.likeBtnActive}
                  />
                ) : (
                  <LikeOutlined
                    className={styles.likeBtn}
                    onClick={onClickLikeBtnHandler}
                  />
                )}
                <div className={styles.like} onClick={onClickLikeBtnHandler}>
                  {likeCount}
                </div>
              </div>
              <div className={styles.reportBtn} onClick={onClickReportBtn}>
                <AlertOutlined />
                신고
              </div>
            </div>
          </div>
        </div>
        <div className={styles.replyContainer}>
          <h2>댓글 {replyCount}개</h2>
          {reply.map((reply) => (
            <Reply
              postId={id}
              reply={reply}
              setReply={setReply}
              reComment={reComment}
              setReComment={setReComment}
            >
              {/* <ReplyOfComment
                postId={id}
                reply={reply}
                setReply={setReply}
                reComment={reComment}
                setReComment={setReComment}
              /> */}
            </Reply>
          ))}
          <Pagination
            defaultCurrent={1}
            total={replyCount}
            responsive={true}
            onChange={onChangePage}
            style={{
              width: "100%",
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          />
        </div>
        <ReplyEditor postId={id} />
      </div>
      {reportModal && (
        <div className={styles.reportModal}>
          <div className={styles.xBtn} onClick={onClickXBtn}>
            X
          </div>
          <h1>신고 사유</h1>
          <select className={styles.select} onChange={onChangeReportSelect}>
            <option value="1">광고</option>
            <option value="2">욕설</option>
            <option value="3">도배</option>
            <option value="4">기타</option>
          </select>
          <textarea
            className={styles.reportReason}
            onChange={onChangeReportContent}
            placeholder="신고 사유를 입력해주세요. (200자 이내)"
            maxLength={200}
          />
          <button onClick={submitReport}>신고</button>
        </div>
      )}
    </>
  );
};
