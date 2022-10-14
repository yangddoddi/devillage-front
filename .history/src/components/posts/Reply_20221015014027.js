import { LikeOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./Reply.module.scss";
import { Editor } from "@toast-ui/react-editor";
import colorPlugin from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { ReplyOfComment } from "./ReplyOfComment";
import { ReplyEditor } from "./ReplyEditor";
import { ReplyOfCommentEditor } from "./ReplyOfCommentEditor";
import axios from "axios";
import { useSelector } from "react-redux";
import { SERVER } from "../../util/Variables";

export const Reply = ({
  children,
  postId,
  reply,
  setReply,
  reComment,
  setReComment,
}) => {
  const [replyOfComment, setReplyOfComment] = useState(false);
  const [replyToggle, setReplyToggle] = useState(false);

  const onChangeEditor = () => {
    setContent(editorRef.current.getInstance().getHTML());
  };

  const editorRef = useRef();
  const [content, setContent] = useState("");

  const onClickReplyOfCommentBtnHandler = () => {
    setReplyOfComment(!replyOfComment);
  };

  const onClickLikeHandler = () => {
    axios
      .post(`${SERVER}/posts/${postId}/comments/${reply.commentId}/like`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const replyToggleHandler = () => {
    setReplyToggle(!replyToggle);
  };

  const id = useSelector((state) => state.token.userId);

  const reg = /<[^>]*>?/g;

  return (
    <div className={styles.replyItem}>
      <div className={styles.replyTop}>
        <div className={styles.replyTopLeft}>
          <UserOutlined className={styles.replyAvatar} />
          <div className={styles.profileRight}>
            <p className={styles.author}>{reply.nickname}</p>
            <span>{reply.createdAt && reply.createdAt.split("T")[0]}</span>
            {reply.userId == id ? <span> · 수정</span> : null}
            {reply.userId == id ? <span> · 삭제</span> : null}
            <span onClick={onClickReplyOfCommentBtnHandler}> · 답글</span>
          </div>
        </div>
        <div className={styles.replyTopRight}>
          <LikeOutlined className={styles.replyLikeBtn} />
          <div className={styles.replyLike} onClick={onClickLikeHandler}>
            {reply.likeCount}
          </div>
        </div>
      </div>
      <div className={styles.replyContent}>
        <p>{reply.content && reply.content.replace(reg, " ")}</p>
      </div>

      <div className={styles.replyToggleBtn} onClick={replyToggleHandler}>
        {replyToggle
          ? "▲ 답글 접기"
          : `▼ 답글 보기 (${reply.reComments.length}개)`}
      </div>
      {/* <div className={styles.replyOfCommentContainer}>{children}</div> */}
      {replyToggle ? (
        <div className={styles.replyOfCommentContainer}>
          {reComment &&
            reComment.map((first) => {
              return first.map((item) => {
                if (item.parentCommentId == reply.commentId) {
                  console.log("들어옴");
                  return (
                    <ReplyOfComment
                      postId={postId}
                      reply={reply}
                      setReply={setReply}
                      reComment={item}
                      setReComment={setReComment}
                      replyOfComment={item}
                    />
                  );
                }
              });
            })}
        </div>
      ) : null}
      {replyOfComment && (
        <ReplyOfCommentEditor
          postId={postId}
          reComment={reComment}
          setReComment={setReComment}
          reply={reply}
          setReply={setReply}
        />
      )}
    </div>
  );
};
