import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { ArrowRight, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import {
  loginAction,
  resetAuthState,
} from "../../../redux/slices/auth/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoading, isError, errorMessage, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  const [email, setEmail] = useState(location.state?.registeredEmail || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      dispatch(resetAuthState());
    };
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setLocalError("Email address is required.");
      toast.warning("Email address is required.");
      return;
    }

    if (!password) {
      setLocalError("Password is required.");
      toast.warning("Password is required.");
      return;
    }

    const result = await dispatch(loginAction({ email: cleanEmail, password }));

    if (loginAction.fulfilled.match(result)) {
      toast.success("Welcome back! Login successful.");
      navigate("/");
    } else if (loginAction.rejected.match(result)) {
      toast.error(
        result.payload || "Login failed. Please check your credentials.",
      );
    }
  };

  const displayedError = localError || (isError && errorMessage);

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-linear-to-br from-brand-background via-brand-background to-slate-100 px-4 py-10 font-sans antialiased">
      <div className="w-full max-w-md overflow-hidden rounded-md border border-slate-100 bg-brand-content shadow-[0_4px_24px_rgb(15,23,42,0.06)]">
        <div className="bg-slate-100 px-8 py-3 text-center">
          <Link
            to="/"
            className="text-base font-extrabold tracking-tighter text-slate-900 transition hover:text-blue-600"
          >
            ShortLink
          </Link>
        </div>

        <div className="p-8">
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Welcome Back
          </h1>
          <p className="mt-1.5 text-xs text-slate-500">
            Please enter your details to sign in.
          </p>

          {displayedError && (
            <div className="mt-4 flex items-start gap-2.5 rounded-md border border-red-200 bg-red-50 p-3 text-xs text-red-700">
              <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-500" />
              <span className="leading-relaxed">{displayedError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
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
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (localError) setLocalError("");
                  if (isError) dispatch(resetAuthState());
                }}
                disabled={isLoading}
                placeholder="name@company.com"
                required
                className="w-full rounded-md border border-slate-200 bg-brand-background px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-300 focus:border-brand-text focus:ring-2 focus:ring-brand-text/20 disabled:bg-slate-100"
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
                <span className="text-[11px] font-bold text-brand-text cursor-pointer hover:underline">
                  Forgot password?
                </span>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (localError) setLocalError("");
                    if (isError) dispatch(resetAuthState());
                  }}
                  disabled={isLoading}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-md border border-slate-200 bg-brand-background py-2.5 pl-3 pr-10 text-sm text-slate-800 outline-none transition placeholder:text-slate-300 focus:border-brand-text focus:ring-2 focus:ring-brand-text/20 disabled:bg-slate-100"
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
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-linear-to-r from-brand-text to-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Log In</span>
                  <ArrowRight size={16} strokeWidth={2.5} />
                </>
              )}
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
              className="flex w-full items-center justify-center gap-2.5 rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 cursor-pointer"
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
          </form>
        </div>
      </div>

      <p className="mt-8 text-xs text-slate-600">
        Don&apos;t have an account?{" "}
        <Link
          to="/register"
          className="font-bold text-brand-text hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
