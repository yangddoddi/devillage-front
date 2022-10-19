import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./root.module.scss";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export const Root = () => {
  const navi = useNavigate();

  //   useEffect(() => {
  //     navi("/board/all");
  //   }, []);

  return (
    <div className={styles.welcomeBox}>
      <h1 className={styles.welcome}>Welcome!</h1>
      <div className={styles.loading}>Loading...</div>
    </div>
  );
};
