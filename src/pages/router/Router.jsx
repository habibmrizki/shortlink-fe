import { Routes, Route } from "react-router";
import NotFound from "../notFound/NotFound";
import Login from "../auth/login/Login";
import Register from "../auth/register/Register";
import LandingPage from "../landingPage/LandingPage";
import Dashboard from "../dashboard/Dashboard";
import CreateLink from "../createLink/CreateLink";
import Profile from "../profile/Profile";
import AuthLayout from "../../components/layouts/AuthLayout";
import MainLayout from "../../components/layouts/MainLayout";

export default function MainRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-link" element={<CreateLink />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
