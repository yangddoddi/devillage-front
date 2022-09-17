import logo from "./logo.svg";
import "./App.scss";
import { RouterConfig } from "./router/RouterConfig";
import { Provider } from "react-redux";
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import "antd/dist/antd.css";

function App() {
  return (
    <>
      <Provider>
        <RouterConfig />
      </Provider>
    </>
  );
}

export default App;
