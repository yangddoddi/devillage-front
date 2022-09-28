import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "../components/header/Header";
import { Main } from "../page/main/Main";
import { Footer } from "../components/footer/Footer";
import { Login } from "../page/login/Login";
import { Join } from "../page/join/Join";
import { PostEditor } from "../components/posts/PostEditor";
import { useEffect, useState } from "react";
import { PostView } from "../components/posts/PostView";
import { Profiles } from "../page/mypage/Profiles";
import { useSelector, useDispatch } from "react-redux";
import { OauthLogin } from "../util/oauth/OauthLogin";

export const RouterConfig = () => {
  const { isLogin } = useSelector((state) => state.token);
  const [category, setCategory] = useState("all");

  const sendCategory = (category) => {
    setCategory(category);
  };

  return (
    <BrowserRouter>
      <Header sendCategory={sendCategory} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/board/:category" element={<Main category={category} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/posts/:id" element={<PostView />} />
        <Route path="/mypage" element={<Profiles />} />
        <Route path="/posts" element={<PostEditor />} />
        <Route path="/users/:id" element={<Profiles />} />
        <Route path="/login/google" element={<OauthLogin />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
