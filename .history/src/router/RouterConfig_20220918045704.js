import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "../components/header/Header";
import { Main } from "../page/main/Main";
import { Footer } from "../components/footer/Footer";
import { Login } from "../page/login/Login";
import { Join } from "../page/join/Join";
import { PostEditor } from "../components/posts/PostEditor";
import { useState } from "react";

export const RouterConfig = () => {
  const [category, setCategory] = useState("all");

  return (
    <BrowserRouter>
      <Header setCategory={setCategory} />
      <Routes>
        <Route path="/*" element={<Main />} setCategory={category} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/posts/*" element={<PostEditor />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
