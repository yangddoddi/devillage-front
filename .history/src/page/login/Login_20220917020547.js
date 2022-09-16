import styles from "./Login.module.scss";
import {
  GithubLoginButton,
  GoogleLoginButton,
  AppleLoginButton,
} from "react-social-login-buttons";

export const Login = () => {
  return (
    <div>
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <div className={styles.loginTitle}>Login</div>
          <div className={styles.loginInput}>
            <input type="text" placeholder="ID" /> <br />
            <input type="password" placeholder="Password" />
            <div className={styles.loginBtn}>Login</div>
            <div className={styles.loginLink}>
              <a href="#">Forgot Password?</a>
              <br />
              <a href="#">Sign Up</a>
            </div>
          </div>
          <GithubLoginButton style={{ width: "300px" }} />
          <GoogleLoginButton />
          <AppleLoginButton />
        </div>
      </div>
    </div>
  );
};
