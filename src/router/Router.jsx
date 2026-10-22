import { Routes, Route } from "react-router";
import NotFound from "../pages/notFound/NotFound";
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/Register";
import LandingPage from "../pages/landingPage/LandingPage";
import Dashboard from "../pages/dashboard/Dashboard";
import CreateLink from "../pages/createLink/CreateLink";
import Profile from "../pages/profile/Profile";
import AuthLayout from "../components/layouts/AuthLayout";
import MainLayout from "../components/layouts/MainLayout";
import PrivateRoute from "./PrivateRoute";

export default function MainRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-link" element={<CreateLink />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
