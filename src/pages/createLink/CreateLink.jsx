import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeft,
  Link2,
  Eye,
  Zap,
  TrendingUp,
  QrCode,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import {
  createLinkAction,
  checkSlugAction,
  resetLinkStatus,
  resetSlugStatus,
} from "../../redux/slices/link/linkSlice";
import { toast } from "react-toastify";

const CreateLink = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isCreating, isCheckingSlug, slugStatus, error } = useSelector(
    (state) => state.link,
  );

  const [destinationUrl, setDestinationUrl] = useState(
    location.state?.initialUrl || "",
  );
  const [customSlug, setCustomSlug] = useState("");
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    return () => {
      dispatch(resetLinkStatus());
    };
  }, [dispatch]);

  const handleSlugBlur = async () => {
    const slug = customSlug.trim();
    if (slug.length >= 3) {
      const res = await dispatch(checkSlugAction(slug));
      if (checkSlugAction.fulfilled.match(res)) {
        if (res.payload.available) {
          toast.success(`Slug "${slug}" is available!`);
        } else {
          toast.error(`Slug "${slug}" is already taken!`);
        }
      }
    } else if (slug.length === 0) {
      dispatch(resetSlugStatus());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    const url = destinationUrl.trim();
    if (!url) {
      setLocalError("Destination URL is required.");
      toast.warning("Destination URL is required.");
      return;
    }

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      setLocalError("URL must start with http:// or https://");
      toast.warning("URL must start with http:// or https://");
      return;
    }

    const slug = customSlug.trim();
    if (slug) {
      if (slug.length < 3 || slug.length > 50) {
        setLocalError("Custom slug must be between 3 and 50 characters.");
        toast.warning("Custom slug must be between 3 and 50 characters.");
        return;
      }
      if (!/^[a-zA-Z0-9-]+$/.test(slug)) {
        setLocalError(
          "Custom slug can only contain letters, numbers, and hyphens.",
        );
        toast.warning("Custom slug can only contain letters, numbers, and hyphens.");
        return;
      }
      const reserved = ["api", "login", "register", "dashboard"];
      if (reserved.includes(slug.toLowerCase())) {
        setLocalError(`Slug cannot use reserved word: "${slug}"`);
        toast.error(`Slug cannot use reserved word: "${slug}"`);
        return;
      }
    }

    const result = await dispatch(
      createLinkAction({
        original_url: url,
        custom_slug: slug || undefined,
      }),
    );

    if (createLinkAction.fulfilled.match(result)) {
      toast.success("Short link created successfully!");
      navigate("/dashboard", {
        state: {
          successMessage: "Short link created successfully!",
        },
      });
    } else if (createLinkAction.rejected.match(result)) {
      toast.error(result.payload || "Failed to create short link.");
    }
  };

  const perks = [
    {
      title: "Real-time Analytics",
      description:
        "Track every click, geographical location, and referral source instantly.",
      icon: TrendingUp,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      title: "Auto-generated QR",
      description:
        "Every link automatically creates a high-resolution QR code for print.",
      icon: QrCode,
      iconBg: "bg-brand-text/10",
      iconColor: "text-brand-text",
    },
  ];

  const displayedError = localError || error;

  return (
    <div className="flex-1 bg-brand-background px-4 py-10 font-sans antialiased">
      <div className="mx-auto w-full max-w-2xl">
        <Link
          to="/dashboard"
          className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium text-brand-text hover:underline"
        >
          <ArrowLeft size={13} strokeWidth={2.5} />
          Back to Dashboard
        </Link>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Create New Short Link
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Transform your long URLs into clean, manageable assets.
        </p>

        <div className="mt-8 rounded-lg border border-slate-200 bg-brand-content p-6 shadow-[0_1px_4px_rgb(15,23,42,0.04)] sm:p-8">
          {displayedError && (
            <div className="mb-6 flex items-start gap-2.5 rounded-md border border-red-200 bg-red-50 p-3 text-xs text-red-700">
              <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-500" />
              <span className="leading-relaxed">{displayedError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="destinationUrl"
                className="mb-2 block text-[11px] font-bold uppercase tracking-wide text-slate-800"
              >
                Destination URL <span className="text-red-600">*</span>
              </label>
              <div className="flex items-center gap-2.5 rounded-md bg-slate-100/70 px-3.5 py-3 focus-within:ring-2 focus-within:ring-brand-text/20">
                <Link2 size={14} className="shrink-0 text-slate-500" />
                <input
                  id="destinationUrl"
                  type="url"
                  value={destinationUrl}
                  onChange={(e) => {
                    setDestinationUrl(e.target.value);
                    if (localError) setLocalError("");
                  }}
                  disabled={isCreating}
                  required
                  placeholder="https://example.com/your-long-url-here"
                  className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />
              </div>
              <p className="mt-2 text-[10px] italic text-slate-500">
                Ensure your URL starts with http:// or https://
              </p>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="customSlug"
                  className="block text-[11px] font-bold uppercase tracking-wide text-slate-800"
                >
                  Custom Slug (Optional)
                </label>
                {customSlug.trim().length >= 3 && (
                  <button
                    type="button"
                    onClick={() => dispatch(checkSlugAction(customSlug.trim()))}
                    disabled={isCheckingSlug}
                    className="text-[11px] font-semibold text-blue-600 hover:underline cursor-pointer"
                  >
                    {isCheckingSlug ? "Checking..." : "Check Availability"}
                  </button>
                )}
              </div>
              <div className="flex overflow-hidden rounded-md focus-within:ring-2 focus-within:ring-brand-text/20">
                <span className="flex items-center bg-slate-200/70 px-3.5 text-xs font-semibold text-slate-700">
                  short.link/
                </span>
                <input
                  id="customSlug"
                  type="text"
                  value={customSlug}
                  maxLength={50}
                  onBlur={handleSlugBlur}
                  onChange={(e) => {
                    setCustomSlug(e.target.value);
                    if (slugStatus.available !== null)
                      dispatch(resetSlugStatus());
                  }}
                  disabled={isCreating}
                  placeholder="my-custom-slug"
                  className="min-w-0 flex-1 bg-slate-100/70 px-3.5 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />
              </div>

              {/* Slug status indicator */}
              {slugStatus.available !== null && (
                <div className="mt-2 flex items-center gap-1.5 text-xs">
                  {slugStatus.available ? (
                    <>
                      <CheckCircle2 size={13} className="text-emerald-600" />
                      <span className="font-medium text-emerald-600">
                        {slugStatus.message || "Slug is available!"}
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertCircle size={13} className="text-red-500" />
                      <span className="font-medium text-red-500">
                        {slugStatus.message || "Slug is already taken"}
                      </span>
                    </>
                  )}
                </div>
              )}

              <p className="mt-2 text-[10px] italic text-slate-500">
                3-50 chars, alphanumeric and hyphens. Leave blank to generate a
                random slug.
              </p>
            </div>

            <div className="rounded-md border border-brand-text/10 bg-brand-text/5 p-4">
              <div className="flex items-center gap-2 text-brand-text">
                <Eye size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Live Preview
                </span>
              </div>
              <p className="mt-2 min-w-0 pl-5.5 text-sm font-medium text-slate-800">
                Your short link will be:{" "}
                <span className="break-all font-bold text-brand-text">
                  http://localhost:2901/{customSlug || "randomSlug"}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-4 pt-1">
              <button
                type="submit"
                disabled={isCreating}
                className="flex items-center justify-center gap-2 rounded-md bg-linear-to-r from-brand-text to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-text/25 transition hover:opacity-90 disabled:opacity-60 cursor-pointer"
              >
                {isCreating ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Creating Link...</span>
                  </>
                ) : (
                  <>
                    <span>Create Link</span>
                    <Zap size={14} fill="currentColor" />
                  </>
                )}
              </button>
              <Link
                to="/dashboard"
                className="text-sm font-medium text-brand-text transition hover:underline"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 px-1 sm:grid-cols-2">
          {perks.map(
            ({ title, description, icon: Icon, iconBg, iconColor }) => (
              <div key={title} className="flex items-start gap-3">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${iconBg} ${iconColor}`}
                >
                  <Icon size={16} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">{title}</h3>
                  <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
                    {description}
                  </p>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLink;
