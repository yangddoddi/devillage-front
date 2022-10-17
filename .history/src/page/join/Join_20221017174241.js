import styles from "./Join.module.scss";
import { useEffect, useState } from "react";
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
  const [emailChangeHandler, setEmailChangeHandler] = useState(false);
  const [timer, setTimer] = useState(180);
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

    instance
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

  const onClickEmailCheck = async (e) => {
    e.preventDefault();
    const instance = axios.create();
    instance.defaults.headers.common["Authorization"] = "";
    instance
      .post(`${SERVER}/auth/email`, {
        email,
      })
      .then((response) => {
        if (response.status === 200) {
          setEmailCheckModal(true);
          setTimer(180);
        }
      })
      .catch((error) => {
        if (error.response.status === 409) {
          alert("이미 존재하는 이메일입니다.");
        }
      });
  };

  const xBtn = () => {
    setEmailCheckModal(false);
  };

  const emailCodeCheck = async (e) => {
    e.preventDefault();
    const instance = axios.create();
    instance.defaults.headers.common["Authorization"] = "";
    instance
      .post(`${SERVER}/auth/email/confirm`, {
        email: email,
        authKey: emailCheckCode,
      })
      .then((response) => {
        if (response.status === 200) {
          setEmailCheck(true);
          setEmailCheckModal(false);
          setEmailChangeHandler(false);
          alert("이메일 인증이 완료되었습니다.");
        }
      })
      .catch((error) => {
        alert("인증번호가 일치하지 않습니다.");
      });
  };

  const emailInputHandler = (e) => {
    setEmail(e.target.value);

    if (emailCheck) {
      setEmailCheck(false);
      setEmailChangeHandler(true);
    }
  };

  useEffect(() => {
    let interval = null;
    if (emailCheckModal) {
      interval = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
    } else if (!emailCheckModal) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [emailCheckModal]);

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
                  onChange={emailInputHandler}
                />{" "}
                <button
                  className={styles.emailCheck}
                  onClick={onClickEmailCheck}
                >
                  인증
                </button>
              </div>
              {emailCheck && (
                <div className={styles.emailCheckSuccess}>
                  인증이 완료되었습니다.
                </div>
              )}
              {emailChangeHandler && (
                <div className={styles.emailCheckSuccess}>
                  이메일이 변경되었습니다. 인증을 다시 해주세요.
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
        <div className={styles.emailCheckbackgroud}>
          <div className={styles.emailCheckModal}>
            <span className={styles.xBtn} onClick={xBtn}>
              X
            </span>
            <h1>이메일 인증</h1>
            <p>입력하신 이메일로 인증코드를 전송했습니다.</p>
            <p>({email})</p>
            <input
              type="text"
              placeholder="인증번호를 입력하세요."
              onChange={(e) => setEmailCheckCode(e.target.value)}
            />
            <button
              onClick={emailCodeCheck}
              disabled={emailCheckCode.length == 0}
            >
              인증
            </button>
            {timer > 0 ? (
              <p className={styles.counter}>남은 시간 : {timer}초</p>
            ) : (
              <p className={styles.counter}>인증 시간이 만료되었습니다.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
