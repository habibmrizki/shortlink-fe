import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  Link2,
  Bell,
  ShieldCheck,
  LogOut,
  User,
  ExternalLink,
} from "lucide-react";
import { logoutAction } from "../../redux/slices/auth/authSlice";
import { getLinksAction } from "../../redux/slices/link/linkSlice";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { links, pagination } = useSelector((state) => state.link);

  const [emailNotifications, setEmailNotifications] = useState(true);

  useEffect(() => {
    // Ensure links count is up to date
    dispatch(getLinksAction({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handleLogout = async () => {
    await dispatch(logoutAction());
    navigate("/");
  };

  const displayName =
    user?.fullname ||
    (user?.email ? user.email.split("@")[0] : "Architect User");

  const totalLinks = pagination?.total_items ?? links.length;

  const formatMemberSince = (dateString) => {
    if (!dateString) return "Recently joined";
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="flex-1 bg-brand-background px-4 py-10 font-sans antialiased">
      <div className="mx-auto w-full max-w-2xl">
        <p className="mb-4 text-[10px] font-medium uppercase tracking-widest text-slate-500">
          Account Management
        </p>

        <div className="rounded-xl border border-slate-100 bg-brand-content p-6 shadow-[0_2px_12px_rgb(15,23,42,0.05)] sm:p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Profile
            </h1>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-[9px] font-bold uppercase tracking-wide text-blue-700 border border-blue-200">
              Active Member
            </span>
          </div>

          <div className="mt-8 flex items-center gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-blue-600 text-white shadow-md">
              <User size={30} strokeWidth={1.75} />
            </div>
            <div>
              <h2 className="text-base font-bold capitalize text-slate-900">
                {displayName}
              </h2>
              <p className="mt-0.5 text-xs text-slate-500">
                {user?.email || "Authenticated User"}
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-slate-50 p-4 border border-slate-100">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Email Address
              </p>
              <p className="mt-1 text-xs font-semibold text-slate-800 break-all">
                {user?.email || "-"}
              </p>
            </div>
            <div className="rounded-lg bg-slate-50 p-4 border border-slate-100">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Account Tenure
              </p>
              <p className="mt-1 text-xs font-semibold text-slate-800">
                Member since: {formatMemberSince(user?.created_at)}
              </p>
            </div>
          </div>

          {/* Active Assets summary banner */}
          <div className="mt-5 flex items-center justify-between rounded-lg bg-linear-to-r from-blue-600 to-blue-700 px-5 py-4 text-white shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15">
                <Link2 size={18} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-blue-100">
                  Active Assets
                </p>
                <p className="text-2xl font-extrabold leading-tight">
                  {totalLinks}
                </p>
              </div>
            </div>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/15 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/25"
            >
              <span>View Links</span>
              <ExternalLink size={12} />
            </Link>
          </div>

          {/* Settings options */}
          <div className="mt-7 space-y-4">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3 text-slate-500">
                <Bell size={16} />
                <span className="text-xs font-medium text-slate-800">
                  Email Notifications
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={emailNotifications}
                aria-label="Toggle email notifications"
                onClick={() => setEmailNotifications((prev) => !prev)}
                className={`relative h-5 w-9 rounded-full transition cursor-pointer ${
                  emailNotifications ? "bg-blue-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                    emailNotifications ? "right-0.5" : "left-0.5"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3 text-slate-500">
                <ShieldCheck size={16} />
                <span className="text-xs font-medium text-slate-800">
                  Two-Factor Authentication
                </span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wide text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                Not Configured
              </span>
            </div>
          </div>

          {/* Logout Button */}
          <div className="mt-6 border-t border-slate-100 pt-6">
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50/50 py-3 text-xs font-semibold text-red-600 transition hover:bg-red-100/70 cursor-pointer"
            >
              <LogOut size={14} />
              Logout Session
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-[10px] text-slate-400">
          Your data is encrypted using AES-256 standards.
        </p>
      </div>
    </div>
  );
};

export default Profile;
