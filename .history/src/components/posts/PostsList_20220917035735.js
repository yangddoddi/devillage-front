import styles from "./PostsList.module.scss";
import { Pagination } from "antd";

export const PostsList = ({ ListName, children }) => {
  return (
    <>
      <div className={styles.bottomContainer}>
        <div className={styles.title}>{ListName}</div>
        <div className={styles.boardContainer}>{children}</div>
        <Pagination
          defaultCurrent={6}
          total={100}
          responsive={true}
          style={{
            width: "100%",
            margin-top: "20px"
          }}
        />
      </div>
    </>
  );
};
