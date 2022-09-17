import logo from "./logo.svg";
import "./App.scss";
import { RouterConfig } from "./router/RouterConfig";
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import "antd/dist/antd.css";
import { Store } from "./redux/Store";
import { Provider } from "react-redux";

function App() {
  return (
    <>
      <Provider store={Store}>
        <RouterConfig />
      </Provider>
    </>
  );
}

export default App;
