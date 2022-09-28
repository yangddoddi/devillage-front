import styles from "./Login.module.scss";
import {
  GithubLoginButton,
  GoogleLoginButton,
  AppleLoginButton,
} from "react-social-login-buttons";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setRefreshToken } from "../../store/Storage";
import { postToken } from "../../api/PostToken";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { setToken } from "../../store/Auth";

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

  // const onClickHandler = async () => {
  //   const result = await postToken(email, password);
  //   if (result.status === 201) {
  //     const accessToken = result.data.accessToken;
  //     const refreshToken = result.data.refreshToken;
  //     const decoded = jwtDecode(accessToken);

  //     axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  //     setRefreshToken(refreshToken);

  //     dispatch(
  //       setToken({
  //         accessToken: accessToken,
  //         userId: decoded.sequence,
  //         nickname: decoded.nickname,
  //         email: decoded.sub,
  //         userRole: decoded.role,
  //       })
  //     );
  //     navi("/");
  //   } else {
  //     alert("로그인에 실패하였습니다.");
  //   }
  // };

  const onClickHandler = async () => {
    axios
      .post("http://localhost:8080/auth/token", {
        email: email,
        password: password,
      })
      .then((res) => {
        const accessToken = res.data.accessToken;
        const refreshToken = res.data.refreshToken;
        const decoded = jwtDecode(accessToken);

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        setRefreshToken(refreshToken);

        dispatch(
          setToken({
            accessToken: accessToken,
            userId: decoded.sequence,
            nickname: decoded.nickname,
            email: decoded.sub,
            userRole: decoded.role,
          })
        );
        navi("/");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 404) {
          alert("이메일 혹은 비밀번호가 일치하지 않습니다.");
        } else {
          alert("로그인에 실패하였습니다.");
        }
      });
  };

  const onClickGithubLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/github";
  };

  const onClickGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
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
            onClick={onClickGithubLogin}
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
            onClick={onClickGoogleLogin}
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
