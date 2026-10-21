import {
  Search,
  ListFilter,
  Link2,
  Calendar,
  BarChart3,
  Copy,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Dashboard = () => {
  const links = [
    {
      short: "shrt.lnk/aB3×9",
      url: "https://www.architecturaldigest.com/story/modern-minimalist-interiors",
      date: "Oct 24, 2023",
      clicks: "1.2K",
    },
    {
      short: "shrt.lnk/v9Pq2",
      url: "https://medium.com/design-ethics/the-future-of-headless-commerce",
      date: "Oct 21, 2023",
      clicks: "842",
    },
    {
      short: "shrt.lnk/zR4t1",
      url: "https://github.com/frameworks/modern-stack-documentation",
      date: "Oct 19, 2023",
      clicks: "2.4K",
    },
    {
      short: "shrt.lnk/mL5k8",
      url: "https://dribbble.com/shots/21435678-Fintech-Dashboard-Concept",
      date: "Oct 15, 2023",
      clicks: "341",
    },
  ];
  return (
    <div className="flex-1 bg-brand-background px-4 py-10 font-sans antialiased">
      <div className="mx-auto w-full max-w-3xl">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              My Links
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              Manage and track your shortened digital assets.
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
              Total Active
            </p>
            <p className="text-2xl font-extrabold leading-tight text-brand-text">
              124
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3 rounded-lg border border-slate-200 bg-brand-content px-4 py-3">
          <Search size={16} className="shrink-0 text-slate-500" />
          <input
            type="text"
            placeholder="Search by name or URL..."
            className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-500"
          />
          <ListFilter size={16} className="shrink-0 text-slate-600" />
        </div>

        <div className="mt-8 space-y-3">
          {links.map((link) => (
            <div
              key={link.short}
              className="flex items-center justify-between gap-4 rounded-lg border border-slate-100 bg-brand-content px-4 py-4 shadow-[0_1px_4px_rgb(15,23,42,0.04)]"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-brand-text">
                  <Link2 size={13} strokeWidth={2.5} />
                  <span className="text-sm font-bold">{link.short}</span>
                </div>
                <p className="mt-1 truncate text-xs text-slate-700">
                  {link.url}
                </p>
                <div className="mt-2 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar size={11} />
                    {link.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <BarChart3 size={11} />
                    {link.clicks} clicks
                  </span>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  aria-label="Copy link"
                  className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-text/10 text-brand-text transition hover:bg-brand-text/20"
                >
                  <Copy size={15} />
                </button>
                <button
                  type="button"
                  aria-label="Delete link"
                  className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between text-xs text-slate-500">
          <button
            type="button"
            className="flex items-center gap-1 font-medium transition hover:text-slate-800"
          >
            <ChevronLeft size={13} />
            Prev Page
          </button>

          <div className="flex items-center gap-3">
            <span className="rounded bg-brand-text/10 px-2 py-1 font-bold text-brand-text">
              1
            </span>
            <span className="text-slate-400">of</span>
            <span className="font-semibold text-slate-900">5</span>
          </div>

          <button
            type="button"
            className="flex items-center gap-1 font-medium transition hover:text-slate-800"
          >
            Next
            <ChevronRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
