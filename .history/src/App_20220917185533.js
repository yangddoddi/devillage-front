import logo from "./logo.svg";
import "./App.scss";
import { RouterConfig } from "./router/RouterConfig";
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import "antd/dist/antd.css";
import { Provider } from "react-redux";

function App() {
  return (
    <>
      <RouterConfig />
    </>
  );
}

export default App;
