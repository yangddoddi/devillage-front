import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "../components/header/Header";
import { Main } from "../page/main/Main";
import { Footer } from "../components/footer/Footer";
import { Login } from "../page/login/Login";
import { Join } from "../page/join/Join";
import { PostEditor } from "../components/posts/PostEditor";
import { useEffect, useState } from "react";

export const RouterConfig = () => {
  const [category, setCategory] = useState("all");

  const sendCategory = (category) => {
    setCategory(category);
  };

  useEffect(() => {
    console.log("라우터" + category);
  }, [category]);

  return (
    <BrowserRouter>
      <Header sendCategory={sendCategory} />
      <Routes>
        <Route path="/*" element={<Main category={category} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/posts/*" element={<PostEditor />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
