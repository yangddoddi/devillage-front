import styles from "./Login.module.scss";
import {
  GithubLoginButton,
  GoogleLoginButton,
  AppleLoginButton,
} from "react-social-login-buttons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setRefreshCookie } from "../../storage/Storeage";
import { auth } from "../../api/PostToken";

export const Login = () => {
  const navi = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onClickHandler = async () => {
    const result = await auth(email, password);
    if (result.status === 200) {
      dispatch(setRefreshCookie(result.data));
      navi("/");
    } else {
      alert("로그인 실패");
    }
  };

  return (
    <div>
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <div className={styles.loginTitle}>Login</div>
          <div className={styles.loginInput}>
            <form className={styles.form}>
              <input
                className={styles.inputBox}
                onChange={onChangeEmail}
                type="text"
                placeholder="ID"
              />{" "}
              <br />
              <input
                className={styles.inputBox}
                type="password"
                placeholder="Password"
                onChange={onChangePassword}
              />
            </form>
            <div className={styles.loginBtn} onClick={onClickHandler}>
              Login
            </div>
          </div>
          <GithubLoginButton
            style={{
              width: "350px",
              marginBottom: "10px",
              height: "40px",
              fontSize: "15px",
            }}
          />
          <GoogleLoginButton
            style={{
              width: "350px",
              marginBottom: "10px",
              height: "40px",
              fontSize: "15px",
            }}
          />
          <AppleLoginButton
            style={{
              width: "350px",
              marginBottom: "10px",
              height: "40px",
              fontSize: "15px",
            }}
          />
          <div className={styles.loginLink}>
            <a href="#">Forgot Password?</a>
            <Link to="/join">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
