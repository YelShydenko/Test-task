import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import './Layout.scss'

const Layout = () => {
  return (
    <>
      <Header /> {/* The Header component will be displayed on every page */}
      <main className="main__content">
        {/* Outlet is a placeholder where child routes will be rendered */}
        <Outlet />
      </main>
      <Footer /> {/* The Footer component will be displayed on every page */}
    </>
  );
};

export default Layout;
