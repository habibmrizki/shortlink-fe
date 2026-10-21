import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Analytics", path: "/analytics" },
    { name: "Links", path: "/links" },
  ];

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="text-xl font-extrabold tracking-tight text-blue-600"
          >
            ShortLink
          </Link>

          <div className="hidden sm:flex items-center gap-6 text-sm">
            {navLinks.map((link) => {
              const isActive =
                location.pathname === link.path ||
                location.pathname.startsWith(`${link.path}/`);

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-medium transition-colors ${
                    isActive
                      ? "text-blue-800 font-semibold"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-3">
          {isLoggedIn ? (
            <button
              onClick={() => setIsLoggedIn(false)}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => setIsLoggedIn(true)}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
            >
              Login
            </button>
          )}
        </div>

        <div className="sm:hidden">
          <button
            type="button"
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="sm:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive =
                location.pathname === link.path ||
                location.pathname.startsWith(`${link.path}/`);

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm font-medium ${
                    isActive ? "text-blue-800 font-semibold" : "text-gray-700"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="border-t border-gray-100 pt-4">
            {isLoggedIn ? (
              <button
                type="button"
                onClick={() => {
                  setIsLoggedIn(false);
                  setMobileOpen(false);
                }}
                className="w-full rounded-lg border border-gray-200 px-4 py-2 text-center text-sm font-medium text-gray-700"
              >
                Logout
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setIsLoggedIn(true);
                  setMobileOpen(false);
                }}
                className="w-full rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
