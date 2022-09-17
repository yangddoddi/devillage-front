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

  useState(() => {
    console.log(category);
  }, [category]);

  const getCategory = (category) => {
    setCategory(category);
  };

  return (
    <BrowserRouter>
      <Header getCategory={getCategory} category={category} />
      <Routes>
        <Route path="/*" element={<Main />} category={category} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/posts/*" element={<PostEditor />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
