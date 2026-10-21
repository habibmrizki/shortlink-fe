import { useState } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-linear-to-br from-brand-background via-brand-background to-slate-100 px-4 py-10 font-sans antialiased">
      <div className="w-full max-w-md overflow-hidden rounded-md border border-slate-100 bg-brand-content shadow-[0_4px_24px_rgb(15,23,42,0.06)]">
        <div className="bg-slate-100 px-8 py-3 text-center">
          <h1 className="text-base font-extrabold tracking-tighter text-slate-900">
            ShortLink
          </h1>
        </div>

        <div className="p-8">
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Welcome Back
          </h1>
          <p className="mt-1.5 text-xs text-slate-500">
            Please enter your details to sign in.
          </p>

          <div className="mt-7 space-y-5">
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
                className="w-full rounded-md border border-slate-200 bg-brand-background px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-300 focus:border-brand-text focus:ring-2 focus:ring-brand-text/20"
              />
            </div>

            {/* password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-slate-800"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-[11px] font-bold text-brand-text hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full rounded-md border border-slate-200 bg-brand-background py-2.5 pl-3 pr-10 text-sm text-slate-800 outline-none transition placeholder:text-slate-300 focus:border-brand-text focus:ring-2 focus:ring-brand-text/20"
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
            </div>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-md bg-linear-to-r from-brand-text to-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
            >
              Log In
              <ArrowRight size={16} strokeWidth={2.5} />
            </button>

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-[10px] font-medium uppercase tracking-widest text-slate-400">
                Or continue with
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-2.5 rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
                />
              </svg>
              Sign in with Google
            </button>
          </div>
        </div>
      </div>

      <p className="mt-8 text-xs text-slate-600">
        Don&apos;t have an account?{" "}
        <a href="#" className="font-bold text-brand-text hover:underline">
          Sign up
        </a>
      </p>
    </div>
  );
};

export default Login;
