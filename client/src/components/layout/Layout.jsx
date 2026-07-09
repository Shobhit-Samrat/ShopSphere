import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Navbar />

      <main className="min-h-screen max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default Layout;