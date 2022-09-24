import styles from "./Login.module.scss";
import {
  GithubLoginButton,
  GoogleLoginButton,
  AppleLoginButton,
} from "react-social-login-buttons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setRefreshToken } from "../../store/Storage";
import { postToken } from "../../api/PostToken";
import axios from "axios";
import jwtDecode from "jwt-decode";
import tokenReducer from "../../store/TokenReducer";

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
    const result = await postToken(email, password);
    if (result.status === 201) {
      result.json().then((data) => {
        const accessToken = data.accessToken;
        const refreshToken = data.refreshToken;
        console.log(jwtDecode(accessToken));
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        setRefreshToken(refreshToken);

        navi("/");
      });
    } else {
      alert("로그인에 실패하였습니다.");
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
