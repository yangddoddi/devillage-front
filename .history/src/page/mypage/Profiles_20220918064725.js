import styles from "./Profiles.module.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const Profiles = () => {
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.profileImg}></div>
        <div className={styles.profileInfo}>
          <div className={styles.name}>이름</div>
          <div className={styles.email}>이메일</div>
          <div className={styles.github}>깃허브</div>
        </div>
      </div>
    </div>
  );
};
