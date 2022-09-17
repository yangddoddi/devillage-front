import logo from "./logo.svg";
import "./App.scss";
import { RouterConfig } from "./router/RouterConfig";
import "antd/dist/antd.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Header } from "./components/header/Header";
import { Main } from "./page/main/Main";
import { Footer } from "./components/footer/Footer";
import { Login } from "./page/login/Login";
import { Join } from "./page/join/Join";
import { PostEditor } from "./components/posts/PostEditor";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header setCategory={setCategory} />
        <Routes>
          <Route path="/*" element={<Main />} category={category} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/posts/*" element={<PostEditor />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
