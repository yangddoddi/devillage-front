import React from "react";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";
import axios from "axios";

export const PostView = () => {
  return (
    <>
      <h2 className={styles.title}>제목</h2>
      <div className={styles.tag}>태그</div>
      <Viewer />
    </>
  );
};
