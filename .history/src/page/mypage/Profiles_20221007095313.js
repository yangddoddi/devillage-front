import styles from "./Profiles.module.scss";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Space } from "antd";
import { SERVER } from "../../util/Variables";

export const Profiles = () => {
  const [nickname, setNickname] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [email, setEmail] = useState("");
  const [lastModifiedAt, setLastModifiedAt] = useState("");
  const [edit, setEdit] = useState(false);

  const userId = useSelector((state) => state.token.userId);
  const { confirm } = Modal;

  const showConfirm = () => {
    confirm({
      title: "정말 탈퇴하시겠습니까?",
      icon: <ExclamationCircleOutlined />,
      content: "탈퇴하시면 복구가 불가능합니다.",
      onOk() {
        deleteUserHandler();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const { id } = useParams();

  const deleteUserHandler = () => {
    axios.delete(`http://${SERVER}/users/${id}`).then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    axios
      .get(`http://${SERVER}/users/profile/${id}`)
      .then((res) => {
        console.log(res);
        setNickname(res.data.nickname);
        setProfileImage(res.data.profileImage);
        setIntroduce(res.data.getStatusMessage);
        setEmail(res.data.email);
        res.data.passwordModifiedAt = res.data.passwordModifiedAt.substring(
          0,
          10
        );
        setLastModifiedAt(res.data.passwordModifiedAt);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.profileTop}>
          <div className={styles.profileImg}>
            <UserOutlined />
          </div>
          <div className={styles.profileInfo}>
            <div className={styles.name}>{nickname}</div>
            <div className={styles.email}>{email}</div>
            <div className={styles.person}>{introduce}</div>
          </div>
          <div className={styles.infoRight}>
            <button className={styles.editBtn}>프로필 편집</button>
          </div>
        </div>
        <div className={styles.profileBottom}>
          <div className={styles.profileBottomLeft}>
            <p>비밀번호 관리</p>
            <h3>최근 변경 : {lastModifiedAt}</h3>
          </div>
          <div className={styles.profileBottomRight}>
            <Link className={styles.passwordEdit}>비밀번호 변경</Link>
          </div>
        </div>
        <div className={styles.last}>
          <p className={styles.deleteBtn} onClick={showConfirm}>
            회원 탈퇴
          </p>
        </div>
      </div>
    </div>
  );
};
