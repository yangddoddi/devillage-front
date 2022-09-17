import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "../components/header/Header";
import { Main } from "../page/main/Main";
import { Footer } from "../components/footer/Footer";
import { Login } from "../page/login/Login";
import { Join } from "../page/join/Join";
import { MyPage } from "../page/mypage/MyPage";
import { Post } from "../page/post/Post";
import { PostWrite } from "../page/postWrite/PostWrite";
import { PostEdit } from "../page/postEdit/PostEdit";

export const RouterConfig = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/posts/*" element={<PostEditor />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
