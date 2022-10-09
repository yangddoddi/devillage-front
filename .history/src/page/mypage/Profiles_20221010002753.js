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
  const [passwordChange, setPasswordChange] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [originalPassword, setOriginalPassword] = useState("");
  const [modal, setModal] = useState(false);

  const [editIntroduce, setEditIntroduce] = useState("");
  const [editNickname, setEditNickname] = useState("");
  const [editProfileImage, setEditProfileImage] = useState("");

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

  const onClickModalBtn = () => {
    setModal(!modal);
  };

  useEffect(() => {
    axios
      .get(`http://${SERVER}/users/profile`)
      .then((res) => {
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

  function onClickEditBtn() {
    setEdit(!edit);
    if (!edit) {
      axios
        .put(`http://${SERVER}/users/profile`, {
          nickname: nickname,
          profileImage: profileImage,
          introduce: introduce,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const onClickEditCompleteBtn = () => {
    axios
      .patch(`http://${SERVER}/users/profile`, {
        nickname: editNickname,
        profileImage: editProfileImage,
        introduce: editIntroduce,
      })
      .then((res) => {
        setEdit(!edit);
        setNickname(editNickname);
        setProfileImage(editProfileImage);
        setIntroduce(editIntroduce);
      })
      .catch((err) => {
        if (err.response.status === 409) {
          alert("닉네임이 중복됩니다.");
        } else {
          console.log(err);
        }
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.profileTop}>
          <div className={styles.profileImg}>
            <UserOutlined />
          </div>
          <div className={styles.profileInfo}>
            {edit ? (
              <input
                type="text"
                className={styles.inputBox}
                value={nickname}
                placeholder="닉네임을 입력해주세요. (12자 이내)"
                maxLength={12}
                onChange={(e) => setEditNickname(e.target.value)}
              />
            ) : (
              <div className={styles.nickname}>{nickname}</div>
            )}
            <div className={styles.email}>{email}</div>
            {edit ? (
              <textarea
                type="text"
                className={styles.inputBox}
                value={introduce}
                placeholder="자기소개를 입력해주세요. (50자 이내)"
                maxLength={50}
                onChange={(e) => setEditIntroduce(e.target.value)}
              />
            ) : (
              <div className={styles.introduce}>
                {introduce ? introduce : "자기소개를 입력해주세요."}
              </div>
            )}
          </div>
          <div className={styles.infoRight}>
            {edit ? (
              <div className={styles.editBtn} onClick={onClickEditCompleteBtn}>
                완료
              </div>
            ) : (
              <div className={styles.editBtn} onClick={onClickEditBtn}>
                수정
              </div>
            )}
          </div>
        </div>
        <div className={styles.profileBottom}>
          <div className={styles.profileBottomLeft}>
            <p>비밀번호 관리</p>
            <h3>최근 변경 : {lastModifiedAt}</h3>
          </div>
          <div className={styles.profileBottomRight}>
            <Link className={styles.passwordEdit} onClick={onClickModalBtn}>
              비밀번호 변경
            </Link>
          </div>
        </div>
        <div className={styles.last}>
          <p className={styles.deleteBtn} onClick={showConfirm}>
            회원 탈퇴
          </p>
        </div>
      </div>
      {modal && (
        <div className={styles.passwordModal}>
          <h1>패스워드 변경</h1>
          <p>기존 패스워드를 입력해주세요</p>
          <input
            type="password"
            className={styles.passwordInput}
            value={password}
            onChange={(e) => setOriginalPassword(e.target.value)}
          />
          <p>패스워드를 입력해주세요</p>
          <input
            type="password"
            className={styles.passwordInput}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p>패스워드를 다시 입력해주세요</p>
          <input
            type="password"
            className={styles.passwordInput}
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
          />
          <div className={styles.passwordBtn}>
            <button className={styles.passwordBtn2}>확인</button>
            <button className={styles.passwordBtn1} onClick={onClickModalBtn}>
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
