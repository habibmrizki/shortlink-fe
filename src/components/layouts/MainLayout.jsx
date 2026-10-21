import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="flex min-h-svh flex-col">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
