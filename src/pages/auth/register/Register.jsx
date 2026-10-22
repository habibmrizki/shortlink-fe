import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  Link2,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import {
  registerAction,
  resetAuthState,
} from "../../../redux/slices/auth/authSlice";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, errorMessage, successMessage } =
    useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    return () => {
      dispatch(resetAuthState());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (localError) setLocalError("");
    if (isError) dispatch(resetAuthState());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    const email = formData.email.trim();
    const { password, confirmPassword } = formData;

    if (!email) {
      setLocalError("Email address is required.");
      toast.warning("Email address is required.");
      return;
    }

    if (!password) {
      setLocalError("Password is required.");
      toast.warning("Password is required.");
      return;
    }

    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters long.");
      toast.warning("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match.");
      toast.error("Passwords do not match.");
      return;
    }

    const result = await dispatch(registerAction({ email, password }));
    if (registerAction.fulfilled.match(result)) {
      toast.success("Account created successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login", {
          state: {
            successMessage:
              "Account created successfully! Please sign in with your credentials.",
            registeredEmail: email,
          },
        });
      }, 1200);
    } else if (registerAction.rejected.match(result)) {
      toast.error(result.payload || "Registration failed.");
    }
  };

  const displayedError = localError || (isError && errorMessage);

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-linear-to-br from-brand-background via-brand-background to-slate-100 px-4 py-10 font-sans antialiased">
      <div className="mb-8 flex flex-col items-center text-center">
        <Link
          to="/"
          className="mb-8 flex items-center justify-center rounded-full bg-blue-100 px-3 py-1 text-brand-text transition hover:bg-blue-200"
          title="Back to Home"
        >
          <Link2 size={16} strokeWidth={2.5} />
        </Link>
        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          Create Account
        </h1>
        <p className="mt-1.5 text-xs text-slate-500">
          Join the elite architects of the web.
        </p>
      </div>

      <div className="w-full max-w-md rounded-md border border-slate-100 bg-brand-content p-8 shadow-[0_4px_24px_rgb(15,23,42,0.06)]">
        {displayedError && (
          <div className="mb-5 flex items-start gap-2.5 rounded-md border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-500" />
            <span className="leading-relaxed">{displayedError}</span>
          </div>
        )}

        {isSuccess && (
          <div className="mb-5 flex items-start gap-2.5 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-700">
            <CheckCircle2
              size={16}
              className="mt-0.5 shrink-0 text-emerald-500"
            />
            <span className="leading-relaxed">
              {successMessage ||
                "Registration successful! Redirecting to login..."}
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
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
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              placeholder="name@company.com"
              required
              className="w-full rounded-md border border-slate-500 bg-brand-background px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand-text focus:ring-2 focus:ring-brand-text/20 disabled:bg-slate-100"
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
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                placeholder="••••••••"
                required
                className="w-full rounded-md border border-slate-500 bg-brand-background py-2.5 pl-3 pr-10 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand-text focus:ring-2 focus:ring-brand-text/20 disabled:bg-slate-100"
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
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isLoading}
                placeholder="••••••••"
                required
                className="w-full rounded-md border border-slate-500 bg-brand-background py-2.5 pl-3 pr-10 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand-text focus:ring-2 focus:ring-brand-text/20 disabled:bg-slate-100"
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
            type="submit"
            disabled={isLoading || isSuccess}
            className="mt-1 flex w-full items-center justify-center gap-2 rounded-md bg-linear-to-r from-brand-text to-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Sign Up</span>
                <ArrowRight size={16} strokeWidth={2.5} />
              </>
            )}
          </button>

          <p className="px-2 text-center text-[11px] leading-relaxed text-slate-500">
            By signing up, you agree to our{" "}
            <span className="font-medium text-brand-text hover:underline cursor-pointer">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="font-medium text-brand-text hover:underline cursor-pointer">
              Privacy Policy
            </span>
            .
          </p>
        </form>
      </div>

      <p className="mt-8 text-xs text-slate-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-brand-text hover:underline"
        >
          Log in
        </Link>
      </p>
    </div>
  );
};

export default Register;
