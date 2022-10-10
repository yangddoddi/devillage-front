import styles from "./Join.module.scss";
import { useState } from "react";
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
import { SERVER } from "../../util/Variables";

export const Join = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickname, setNickname] = useState("");

  const navigate = useNavigate();

  const onJoin = async (e) => {
    e.preventDefault();
    if (password !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    const instance = axios.create();
    instance.defaults.headers.common["Authorization"] = ";";

    const response = await instance
      .post(`${SERVER}/auth/new`, {
        email,
        password,
        nickname,
      })
      .then((response) => {
        if (response.status === 201) {
          alert("회원가입이 완료되었습니다.");
          navigate("/login");
        }
      })
      .catch((error) => {
        if (error.response.status === 409) {
          alert("이미 존재하는 이메일입니다.");
        } else {
          console.log(error);
        }
      });
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
                onChange={(e) => setEmail(e.target.value)}
              />{" "}
              <br />
              <h3>비밀번호</h3>
              <input
                className={styles.inputBox}
                type="password"
                placeholder="패스워드를 입력하세요."
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <h3>비밀번호 재확인</h3>
              <input
                className={styles.inputBox}
                type="password"
                placeholder="다시 한 번 입력해주세요."
                onChange={(e) => setPasswordCheck(e.target.value)}
              />
              <br />
              <h3>닉네임</h3>
              <input
                className={styles.inputBox}
                type="nickname"
                placeholder="닉네임을 입력하세요."
                onChange={(e) => setNickname(e.target.value)}
              />
              <button className={styles.loginBtn} onClick={onJoin}>
                Join
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
