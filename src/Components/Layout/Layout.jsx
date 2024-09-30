import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import './Layout.scss'

const Layout = () => {
  return (
    <>
      <Header />
      <main className="main__content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
export default Layout;
