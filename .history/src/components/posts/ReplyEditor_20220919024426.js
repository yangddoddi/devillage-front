import styles from "./ReplyEditor.module.scss";

export const ReplyEditor = () => {
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
          language="ko=KR"
          ref={editorRef}
          className={styles.editor}
        />
        <button className={styles.commentBtn}>댓글 작성</button>
      </div>
    </div>
  );
};
