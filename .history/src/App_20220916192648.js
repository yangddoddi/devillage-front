import logo from "./logo.svg";
import "./App.scss";
import { RouterConfig } from "./router/RouterConfig";
import { Header } from "./components/header/Header";
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <RouterConfig />
      <Footer />
    </>
  );
}

export default App;
