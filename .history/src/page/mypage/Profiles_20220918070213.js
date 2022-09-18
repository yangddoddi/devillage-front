import styles from "./Profiles.module.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
            <div className={styles.github}>안녕하세요 저는 사람입니다</div>
            <button className={styles.editBtn}>프로필 편집</button>
          </div>
        </div>
        <div className={styles.profileBottom}>
          <div className={styles.profileBottomLeft}></div>
        </div>
      </div>
    </div>
  );
};