import { useState } from "react";
import { Link2, ArrowRight, Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-linear-to-br from-brand-background via-brand-background to-slate-100 px-4 py-10 font-sans antialiased">
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="mb-8 flex items-center justify-center rounded-full bg-blue-100 px-3 py-1 text-brand-text">
          <Link2 size={16} strokeWidth={2.5} />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          Create Account
        </h1>
        <p className="mt-1.5 text-xs text-slate-500">
          Join the elite architects of the web.
        </p>
      </div>

      <div className="w-full max-w-md rounded-md border border-slate-100 bg-brand-content p-8 shadow-[0_4px_24px_rgb(15,23,42,0.06)]">
        <div className="space-y-5">
          {/* email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-xs font-medium text-slate-800"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@company.com"
              className="w-full rounded-md border border-slate-500 bg-brand-background px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand-text focus:ring-2 focus:ring-brand-text/20"
            />
          </div>

          {/* password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-xs font-medium text-slate-800"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full rounded-md border border-slate-500 bg-brand-background py-2.5 pl-3 pr-10 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand-text focus:ring-2 focus:ring-brand-text/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="mt-1.5 text-[10px] font-medium uppercase tracking-wide text-slate-500">
              Minimum 8 characters
            </p>
          </div>

          {/* confirm password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-xs font-medium text-slate-800"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full rounded-md border border-slate-500 bg-brand-background py-2.5 pl-3 pr-10 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand-text focus:ring-2 focus:ring-brand-text/20"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="button"
            className="mt-1 flex w-full items-center justify-center gap-2 rounded-md bg-linear-to-r from-brand-text to-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
          >
            Sign Up
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>

          <p className="px-2 text-center text-[11px] leading-relaxed text-slate-500">
            By signing up, you agree to our{" "}
            <a href="#" className="font-medium text-brand-text hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="font-medium text-brand-text hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>

      <p className="mt-8 text-xs text-slate-600">
        Already have an account?{" "}
        <a href="#" className="font-medium text-brand-text hover:underline">
          Log in
        </a>
      </p>
    </div>
  );
};

export default Register;
