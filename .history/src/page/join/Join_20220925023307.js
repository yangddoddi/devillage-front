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

    return (
      <div>
        <div className={styles.loginContainer}>
          <div className={styles.loginBox}>
            <div className={styles.loginTitle}>Join</div>
            <div className={styles.loginInput}>
              <form className={styles.form}>
                <input
                  className={styles.inputBox}
                  type="email"
                  placeholder="email"
                />{" "}
                <br />
                <input
                  className={styles.inputBox}
                  type="password"
                  placeholder="Password"
                />
                <br />
                <input
                  className={styles.inputBox}
                  type="nickname"
                  placeholder="nickname"
                />
              </form>
              <div className={styles.loginBtn}>Join</div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};
