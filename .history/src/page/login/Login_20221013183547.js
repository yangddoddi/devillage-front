import styles from "./Login.module.scss";
import {
  GithubLoginButton,
  GoogleLoginButton,
  AppleLoginButton,
} from "react-social-login-buttons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRefreshToken } from "../../store/Storage";
import { postToken } from "../../api/PostToken";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { setToken } from "../../store/Auth";
import { SERVER } from "../../util/Variables";

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

  const isLogin = useSelector((state) => state.token.isLogin);

  useEffect(() => {
    if (isLogin) {
      navi("/");
    }
  }, []);

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
    const instance = axios.create();
    instance.defaults.headers.common["Authorization"] = "";
    instance
      .post(`${SERVER}/auth/token`, {
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
        localStorage.setItem("accessToken", accessToken);

        dispatch(
          setToken({
            accessToken: accessToken,
            userId: decoded.sequence,
            nickName: decoded.nickName,
            email: decoded.sub,
            roles: decoded.roles,
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
    window.location.href = `http://${SERVER}/oauth2/authorization/github`;
  };

  const onClickGoogleLogin = () => {
    window.location.href = `http://${SERVER}/oauth2/authorization/google`;
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
          <div className={styles.loginLink}>
            <a href="#">Forgot Password?</a>
            <Link to="/join">Sign Up</Link>
          </div>
          <GithubLoginButton
            onClick={onClickGithubLogin}
            style={{
              marginTop: "25px",
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
        </div>
      </div>
    </div>
  );
};
