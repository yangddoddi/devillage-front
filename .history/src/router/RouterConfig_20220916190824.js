import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "../components/Header";

export const RouterConfig = () => {
  return (
    <BrowserRouter>
      <Routes>{/* <Route path="/" element={<Main />} /> */}</Routes>
    </BrowserRouter>
  );
};
