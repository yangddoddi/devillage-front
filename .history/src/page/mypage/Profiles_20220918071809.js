import styles from "./Profiles.module.scss";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { UserOutlined } from "@ant-design/icons";

export const Profiles = () => {
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.profileTop}>
          <div className={styles.profileImg}>
            <UserOutlined />
          </div>
          <div className={styles.profileInfo}>
            <div className={styles.name}>김수박</div>
            <div className={styles.email}>asddss@naver.com</div>
            <div className={styles.person}>안녕하세요 저는 사람입니다</div>
          </div>
          <div className={styles.infoRight}>
            <button className={styles.editBtn}>프로필 편집</button>
          </div>
        </div>
      </div>
      <div className={styles.profileBottom}>
        <div className={styles.profileBottomLeft}>
          <p>비밀번호 관리</p>
          <h3>최근 변경 : 2022.02.01</h3>
        </div>
        <div className={styles.profileBottomRight}>
          <Link className={styles.passwordEdit}>비밀번호 변경</Link>
        </div>
      </div>
    </div>
  );
};
