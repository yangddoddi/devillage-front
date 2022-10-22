import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { SERVER } from "../../util/Variables";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./rank.module.scss";
import { Badge } from "./badge";

export const Rank = () => {
  const [user, setUser] = useState([]);

  return (
    <div className={styles.container}>
      <h1> RANK </h1>
      <Badge />
      <Badge />
      <Badge />
      <Badge />
    </div>
  );
};
