import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { SERVER } from "../../util/Variables";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./rank.module.scss";
import { Badge } from "./badge";

export const Rank = () => {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState("point");
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get(`${SERVER}/board/rank?p=${selected}&page=${page}&size=10`)
      .then((res) => {
        setUsers(res.data.data);
      });
  }, [selected, page]);

  const clickOptionHandler = (e) => {
    if (e.target.value === "· 포인트") {
      setSelected("point");
    } else if (e.target.value === "· 댓글") {
      setSelected("comment");
    } else if (e.target.value === "· 게시글") {
      setSelected("post");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.rankHeader}>
        <h1> RANK </h1>
      </div>
      <div className={styles.sortContainer}>
        <div onClick={clickOptionHandler}>· 포인트</div>
        <div onClick={clickOptionHandler}>· 게시글</div>
        <div onClick={clickOptionHandler}>· 댓글</div>
      </div>
      <div className={styles.rankList}>
        {users.length > 0 &&
          users.map((user) => {
            return <Badge user={user} />;
          })}
        <Badge />
        <Badge />
        <Badge />
        <Badge />
      </div>
    </div>
  );
};
