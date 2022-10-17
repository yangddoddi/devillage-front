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
  const [emailCheck, setEmailCheck] = useState(false);
  const [emailCheckModal, setEmailCheckModal] = useState(false);
  const [emailCheckCode, setEmailCheckCode] = useState("");

  const navigate = useNavigate();

  const onJoin = async (e) => {
    e.preventDefault();
    if (!emailCheck) {
      alert("이메일 인증을 완료해주세요");
      return;
    }
    if (password !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    const instance = axios.create();
    instance.defaults.headers.common["Authorization"] = "";

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
              <div className={styles.emailBox}>
                <input
                  className={styles.inputBox}
                  type="email"
                  placeholder="이메일을 입력하세요."
                  onChange={(e) => setEmail(e.target.value)}
                />{" "}
                <button
                  className={styles.emailCheck}
                  onClick={() => setEmailCheckModal(true)}
                >
                  인증
                </button>
              </div>
              {!emailCheck && (
                <div className={styles.emailCheckSuccess}>
                  인증이 완료되었습니다.
                </div>
              )}
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
              {passwordCheck && password !== passwordCheck ? (
                <div className={styles.passwordCheck}>
                  비밀번호가 일치하지 않습니다.
                </div>
              ) : null}
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
      {emailCheckModal && (
        <div>
          <div>
            <h1>이메일 인증</h1>
            <input
              type="text"
              placeholder="인증번호를 입력하세요."
              onChange={(e) => setEmailCheckCode(e.target.value)}
            />
            <button
              // onClick={emailCodeCheck}
              disabled={emailCheckCode.length === 0}
            >
              인증
            </button>
          </div>
    </div>
  );
};
