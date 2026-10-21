import { Outlet } from "react-router";
import Footer from "../footer/Footer";

const AuthLayout = () => {
  return (
    <div className="flex min-h-svh flex-col">
      <Outlet />
      <Footer />
    </div>
  );
};

export default AuthLayout;
