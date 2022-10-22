import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { SERVER } from "../../util/Variables";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./rank.module.scss";
import { Badge } from "./badge";

export const Rank = () => {
  const [user, setUser] = useState([]);
  const [selected, setSelected] = useState("point");
  const [page, setPage] = useState(1);

  const option = useRef();

  useEffect(() => {
    axios
      .get(`${SERVER}/board/rank?p=${selected}&page=${page}&size=10`)
      .then((res) => {
        setUser(res.data.data);
      });
  }, [selected, page]);

  const clickOptionHandler = (e) => {
    setSelected(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.rankHeader}>
        <h1> RANK </h1>
      </div>
      <div className={styles.sortContainer}>
        <div onClick={clickOptionHandler}>· 포인트순</div>
        <div onClick={clickOptionHandler}>· 게시글순</div>
        <div onClick={clickOptionHandler}>· 댓글순</div>
      </div>
      <div className={styles.rankList}>
        <Badge />
        <Badge />
        <Badge />
        <Badge />
      </div>
    </div>
  );
};
