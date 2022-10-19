import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./root.module.scss";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";

export const Root = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const navi = useNavigate();

  useEffect(() => {
    navi("/board/all");
  }, []);

  return (
    <div className={styles.welcomeBox}>
      <h1 className={styles.welcome}>Welcome!</h1>
      <div className={styles.loading}>
        <h3>로딩중입니다...</h3>
        <Spin indicator={antIcon} className={styles.spin} />
      </div>
    </div>
  );
};
