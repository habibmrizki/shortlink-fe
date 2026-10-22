import {
  ChevronDown,
  Link2,
  LogOut,
  Menu,
  Plus,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../../redux/slices/auth/authSlice";
import { toast } from "react-toastify";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const isDashboardActive = location.pathname === "/dashboard";

  const handleLogout = async () => {
    await dispatch(logoutAction());
    setMobileOpen(false);
    setAccountMenuOpen(false);
    toast.success("Logged out successfully.");
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6"
      >
        <div className="flex min-w-0 items-center gap-8">
          <Link
            to="/"
            className="inline-flex shrink-0 items-center gap-2 text-xl font-extrabold tracking-tight text-blue-700 transition hover:text-blue-800"
            onClick={() => setMobileOpen(false)}
          >
            <img src="/shortlink-mark.svg" alt="" className="size-8" />
            ShortLink
          </Link>

          {isAuthenticated && (
            <div className="hidden items-center gap-1 sm:flex">
              <Link
                to="/dashboard"
                aria-current={isDashboardActive ? "page" : undefined}
                className={`border-b-2 px-3 py-5.5 text-sm font-semibold transition-colors ${
                  isDashboardActive
                    ? "border-blue-700 text-blue-700"
                    : "border-transparent text-slate-600 hover:text-blue-700"
                }`}
              >
                Dashboard
              </Link>
            </div>
          )}
        </div>

        <div className="hidden items-center gap-3 sm:flex">
          {isAuthenticated ? (
            <>
              <button
                type="button"
                onClick={() => navigate("/create-link")}
                className="inline-flex items-center gap-2 rounded-md bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Plus size={17} aria-hidden="true" />
                Create Link
              </button>

              <div className="relative ml-1 border-l border-slate-200 pl-3">
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={accountMenuOpen}
                  onClick={() => setAccountMenuOpen((open) => !open)}
                  className="flex items-center gap-2 rounded-md p-1.5 text-left transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-blue-50 ">
                    <UserRound size={18} aria-hidden="true" />
                  </span>
                  <span className="max-w-36 truncate text-sm font-medium text-slate-700">
                    {user?.email || "Account"}
                  </span>
                  <ChevronDown
                    size={16}
                    aria-hidden="true"
                    className={`text-slate-500 transition-transform ${
                      accountMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {accountMenuOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 top-full mt-2 w-48 rounded-md border border-slate-200 bg-white p-1.5 shadow-lg"
                  >
                    <Link
                      to="/profile"
                      role="menuitem"
                      onClick={() => setAccountMenuOpen(false)}
                      className="flex items-center gap-2 rounded px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50 hover:text-blue-700"
                    >
                      <UserRound size={16} aria-hidden="true" />
                      Profile
                    </Link>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded px-3 py-2 text-sm text-rose-700 transition hover:bg-rose-50"
                    >
                      <LogOut size={16} aria-hidden="true" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="rounded-md px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-blue-700"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 sm:hidden">
          {isAuthenticated && (
            <button
              type="button"
              onClick={() => navigate("/create-link")}
              aria-label="Create link"
              className="grid size-10 place-items-center rounded-md bg-blue-700 text-white transition hover:bg-blue-800"
            >
              <Plus size={20} aria-hidden="true" />
            </button>
          )}
          <button
            type="button"
            className="grid size-10 place-items-center rounded-md border border-slate-200 text-slate-700 transition hover:bg-slate-50"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="space-y-3 border-t border-slate-100 bg-white px-4 py-4 sm:hidden">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-semibold ${
                  isDashboardActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Link2 size={17} aria-hidden="true" />
                Dashboard
              </Link>
              <Link
                to="/profile"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <UserRound size={17} aria-hidden="true" />
                Profile
              </Link>
              <div className="border-t border-slate-100 pt-3">
                <p className="truncate px-3 pb-2 text-xs text-slate-500">
                  {user?.email || "Signed in"}
                </p>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-left text-sm font-medium text-rose-700 hover:bg-rose-50"
                >
                  <LogOut size={17} aria-hidden="true" />
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="rounded-md border border-slate-200 px-4 py-2.5 text-center text-sm font-semibold text-slate-700"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileOpen(false)}
                className="rounded-md bg-blue-700 px-4 py-2.5 text-center text-sm font-semibold text-white"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
