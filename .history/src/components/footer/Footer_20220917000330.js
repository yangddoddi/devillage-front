import styles from "./Footer.module.scss";
import { GithubOutlined } from "@ant-design/icons";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <GithubOutlined className={styles.icon} />
      <p>Contact Us</p>
      <p>2022 @YangEunChan</p>
    </footer>
  );
};
