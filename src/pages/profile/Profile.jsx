import { Pencil, Link2, Bell, ShieldCheck, LogOut, User } from "lucide-react";

const Profile = () => {
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
            <span className="rounded-full bg-brand-text/10 px-3 py-1 text-[9px] font-bold uppercase tracking-wide text-brand-text">
              Pro Member
            </span>
          </div>

          <div className="mt-10 flex items-center gap-5">
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-slate-900 text-slate-500">
                <User size={30} strokeWidth={1.5} />
              </div>
              <button
                type="button"
                aria-label="Edit photo"
                className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-md bg-white text-brand-text shadow-md transition hover:bg-slate-50"
              >
                <Pencil size={11} strokeWidth={2.5} />
              </button>
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Alex Thompson
              </h2>
              <p className="mt-1 text-[11px] text-slate-500">
                Product Architect at Digital Flow
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-md bg-slate-100 px-4 py-3.5">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Email Address
              </p>
              <p className="mt-1 text-xs text-slate-800">user@example.com</p>
            </div>
            <div className="rounded-md bg-slate-100 px-4 py-3.5">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Account Tenure
              </p>
              <p className="mt-1 text-xs text-slate-800">
                Member since: January 1, 2026
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between rounded-lg bg-brand-text px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white/15">
                <Link2 size={16} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-widest text-white/80">
                  Active Assets
                </p>
                <p className="text-xl font-extrabold leading-tight">12</p>
              </div>
            </div>
            <button
              type="button"
              className="rounded-md border border-white/20 bg-white/15 px-4 py-2 text-[10px] font-bold uppercase tracking-wide text-white transition hover:bg-white/25"
            >
              View Links
            </button>
          </div>

          <div className="mt-7 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-slate-400">
                <Bell size={15} />
                <span className="text-xs text-slate-800">
                  Email Notifications
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked="true"
                aria-label="Email notifications"
                className="relative h-5 w-9 rounded-full bg-brand-text transition"
              >
                <span className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-slate-400">
                <ShieldCheck size={15} />
                <span className="text-xs text-slate-800">
                  Two-Factor Authentication
                </span>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wide text-red-700">
                Disabled
              </span>
            </div>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-6">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-md border border-slate-200 bg-slate-50 py-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              <LogOut size={13} />
              Logout Session
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-[10px] text-slate-400">
          Your data is encrypted using AES-256 standards.{" "}
          <a href="#" className="text-brand-text hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default Profile;
