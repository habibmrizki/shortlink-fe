import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { Link2, Zap, Link as LinkIcon, Users, Check } from "lucide-react";

const features = [
  {
    title: "Easy Create",
    description:
      "Instantly generate high-performance short links with a single click or through our surgical API endpoints.",
    icon: Zap,
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    lineColor: "bg-indigo-300",
  },
  {
    title: "Custom Slugs",
    description:
      "Maintain brand authority with readable, custom link endings that resonate with your digital audience.",
    icon: LinkIcon,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    lineColor: "bg-blue-300",
  },
  {
    title: "Team Ready",
    description:
      "Collaborate across departments with shared workspaces, permissions, and unified analytics dashboards.",
    icon: Users,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    lineColor: "bg-orange-300",
  },
];

const insights = [
  "Geographic Distribution Maps",
  "Device & Browser Breakdown",
  "UTM Parameter Tracking",
];

const LandingPage = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [quickUrl, setQuickUrl] = useState("");

  const handleQuickShorten = (e) => {
    e.preventDefault();
    if (!quickUrl.trim()) return;

    if (isAuthenticated) {
      navigate("/create-link", { state: { initialUrl: quickUrl.trim() } });
    } else {
      navigate("/login", {
        state: {
          successMessage: "Please log in first to create and manage short links.",
        },
      });
    }
  };

  return (
    <div>
      <div className="font-sans text-slate-900 antialiased">
        <section className="relative overflow-hidden bg-[#f4f7fa] px-4 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-xl max-w-full -translate-x-1/2 -translate-y-1/3 rounded-full bg-blue-200/30 blur-3xl" />

          <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
            {isAuthenticated && (
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700 shadow-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Welcome back, {user?.email}
              </div>
            )}

            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-black sm:text-5xl lg:text-[56px]">
              Shorten URLs. <span className="text-blue-600">Share Easily.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-500 sm:text-lg">
              Create short, memorable links for your team communications.
              Transform long, cumbersome URLs into powerful digital assets that
              drive engagement.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <Link
                to={isAuthenticated ? "/dashboard" : "/register"}
                className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                {isAuthenticated ? "Go to Dashboard" : "Get Started"}
              </Link>
              <a
                href="#features"
                className="rounded-lg border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Learn More
              </a>
            </div>

            <form
              onSubmit={handleQuickShorten}
              className="mt-12 flex w-full items-center gap-2 rounded-xl border border-slate-100 bg-white p-2 shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
            >
              <Link2 size={18} className="ml-3 shrink-0 text-slate-300" />
              <input
                type="url"
                value={quickUrl}
                onChange={(e) => setQuickUrl(e.target.value)}
                placeholder="https://very-long-architectural-url.com/asset-id-99238-x1"
                className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="shrink-0 whitespace-nowrap rounded-lg bg-blue-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 cursor-pointer"
              >
                Shorten
              </button>
            </form>
          </div>
        </section>

        <section id="features" className="bg-[#f4f7fa] px-4 pb-24">
          <div className="mx-auto max-w-6xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-blue-600">
              Architectural Features
            </p>
            <h2 className="mb-10 text-3xl font-extrabold tracking-tight text-black">
              Built for Enterprise Precision
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {features.map(
                ({
                  title,
                  description,
                  icon: Icon,
                  iconBg,
                  iconColor,
                  lineColor,
                }) => (
                  <div
                    key={title}
                    className="flex flex-col items-start rounded-xl border border-slate-50 bg-white p-7 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.12)]"
                  >
                    <div
                      className={`mb-6 flex h-10 w-10 items-center justify-center rounded-lg ${iconBg} ${iconColor}`}
                    >
                      <Icon size={18} strokeWidth={2.5} />
                    </div>
                    <h3 className="mb-3 text-base font-bold text-black">
                      {title}
                    </h3>
                    <p className="mb-6 grow text-sm leading-relaxed text-slate-500">
                      {description}
                    </p>
                    <div className={`h-1 w-8 rounded-full ${lineColor}`} />
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-24">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-14 lg:flex-row lg:gap-20">
            <div className="relative w-full lg:w-1/2">
              <img
                src="/features.svg"
                alt="Analytics features"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>

            <div className="w-full lg:w-1/2">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">
                Data Driven Insights
              </p>
              <h2 className="mb-5 text-3xl font-extrabold leading-tight tracking-tight text-black">
                Observe your link architecture in real-time.
              </h2>
              <p className="mb-8 text-sm leading-relaxed text-slate-500">
                Every click is a data point. Our dashboard provides surgical
                precision into where your traffic originates, who is engaging,
                and how your team communications are performing across the
                globe.
              </p>

              <ul className="space-y-4 text-sm font-semibold text-black">
                {insights.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
