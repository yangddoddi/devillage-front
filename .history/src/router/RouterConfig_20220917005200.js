import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "../components/header/Header";
import { Main } from "../page/main/Main";
import { Footer } from "../components/footer/Footer";
import { Login } from "../page/login/Login";
import { Signup } from "../page/signup/Signup";
import { Post } from "../page/post/Post";
import { PostWrite } from "../page/postWrite/PostWrite";

export const RouterConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
