import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Layout } from "antd";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";

function App() {
  const { Content } = Layout;
  return (
    <>
      <Header />
      <Content style={{ padding: "0 48px" }}>
        <Outlet />
      </Content>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
