import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { SERVER } from "../../util/Variables";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./rank.module.scss";
import { Badge } from "./badge";

export const Rank = () => {
  const [user, setUser] = useState([]);
  const [sort, setSort] = useState("point");

  return (
    <div className={styles.container}>
      <div className={styles.rankHeader}>
        <h1> RANK </h1>
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
