import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "../components/header/Header";
import { Main } from "../page/main/Main";

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
