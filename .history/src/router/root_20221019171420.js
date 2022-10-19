import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styles } from "./root.module.scss";

export const Root = () => {
  const navi = useNavigate();

  //   useEffect(() => {
  //     navi("/board/all");
  //   }, []);

  return (
    <div>
      <h1 className={styles.welcome}>Welcome!</h1>
      <div>Loading...</div>
    </div>
  );
};
