import styles from "./PostItem.module.scss";

export const PostItem = () => {
  return (
    <div className={styles.boardItem}>
      <div className={styles.boardItem_left}>
        <h1>제가 한 코딩 보실 분 ㅋㅋ</h1>
        <p></p>
        <span>태그</span>
        <div className={styles.postInfo}>작성일/조회수</div>
      </div>
      <div className={styles.boardItem_right}>
        <img src="/image/web.jpeg"></img>
      </div>
    </div>
  );
};
