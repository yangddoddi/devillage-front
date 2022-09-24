import styles from "./Join.module.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { join } from "../../store/Auth";
import { setRefreshToken } from "../../store/Storage";
import axios from "axios";
import originalRequest from "../../api/Interceptor";

export const Join = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickName, setNickname] = useState("");

  const dispatch = useDispatch();

  const onJoin = async () => {
    if (password !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    const response = await axios.post("http://localhost:8080/auth/join", {
      email,
      password,
      nickName,
    });
    if (response.status === 201) {
      alert("회원가입 성공");
    }
  };

  return (
    <div>
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <div className={styles.loginTitle}>Join</div>
          <div className={styles.loginInput}>
            <form className={styles.form}>
              <h3>이메일</h3>
              <input
                className={styles.inputBox}
                type="email"
                placeholder="이메일을 입력하세요."
              />{" "}
              <br />
              <h3>비밀번호</h3>
              <input
                className={styles.inputBox}
                type="password"
                placeholder="패스워드를 입력하세요."
              />
              <br />
              <h3>비밀번호 재확인</h3>
              <input
                className={styles.inputBox}
                type="passwordCheck"
                placeholder="다시 한 번 입력해주세요."
              />
              <br />
              <h3>닉네임</h3>
              <input
                className={styles.inputBox}
                type="nickname"
                placeholder="닉네임을 입력하세요."
              />
            </form>
            <div className={styles.loginBtn}>Join</div>
          </div>
        </div>
      </div>
    </div>
  );
};
