import styles from "./Footer.module.scss";
import { GithubOutlined } from "@ant-design/icons";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a href="https://github.com/Dev-illage/Devillage">
        <GithubOutlined className={styles.icon} />
      </a>
      <p>
        <a href="https://github.com/Dev-illage/Devillage">Contact Us</a>
      </p>
      <p onClick={() => alert("권한이 없습니다.")}>Admin</p>
      <p>
        <a href="https://github.com/yangddoddi">2022 @YangEunChan</a>
      </p>
    </footer>
  );
};
