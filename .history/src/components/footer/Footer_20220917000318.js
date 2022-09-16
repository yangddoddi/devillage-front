import styles from "./Footer.module.scss";
import { GithubOutlined } from "@ant-design/icons";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <GithubOutlined className={styles.icon} />
      <p>2022 @YangEunChan</p>
      <p>Contact Us</p>
    </footer>
  );
};
