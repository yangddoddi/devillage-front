import logo from "./logo.svg";
import "./App.scss";
import { RouterConfig } from "./router/RouterConfig";
import { Provider } from "react-redux";
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import "antd/dist/antd.css";
import store from "./rdux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterConfig />
      </Provider>
    </>
  );
}

export default App;
