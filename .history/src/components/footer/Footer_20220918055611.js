import styles from "./Footer.module.scss";
import { GithubOutlined } from "@ant-design/icons";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <GithubOutlined className={styles.icon} />
      <p>
        <a href="https://github.com/Dev-illage" color="white">
          Contact Us
        </a>
      </p>
      <p>Admin</p>
      <p>
        <a href="https://github.com/yangddoddi">2022 @YangEunChan</a>
      </p>
    </footer>
  );
};
