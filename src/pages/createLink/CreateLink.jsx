import { ArrowLeft, Link2, Eye, Zap, TrendingUp, QrCode } from "lucide-react";

const CreateLink = () => {
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
  return (
    <div className="flex-1 bg-brand-background px-4 py-10 font-sans antialiased">
      <div className="mx-auto w-full max-w-2xl">
        <a
          href="#"
          className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium text-brand-text hover:underline"
        >
          <ArrowLeft size={13} strokeWidth={2.5} />
          Back to Dashboard
        </a>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Create New Short Link
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Transform your long URLs into clean, manageable assets.
        </p>

        <div className="mt-8 rounded-lg border border-slate-200 bg-brand-content p-6 shadow-[0_1px_4px_rgb(15,23,42,0.04)] sm:p-8">
          <div className="space-y-6">
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
                  placeholder="https://example.com/your-long-url-here"
                  className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />
              </div>
              <p className="mt-2 text-[10px] italic text-slate-500">
                Ensure your URL starts with http:// or https://
              </p>
            </div>

            <div>
              <label
                htmlFor="customSlug"
                className="mb-2 block text-[11px] font-bold uppercase tracking-wide text-slate-800"
              >
                Custom Slug (Optional)
              </label>
              <div className="flex overflow-hidden rounded-md focus-within:ring-2 focus-within:ring-brand-text/20">
                <span className="flex items-center bg-slate-200/70 px-3.5 text-xs font-semibold text-slate-700">
                  short.link/
                </span>
                <input
                  id="customSlug"
                  type="text"
                  placeholder="my-custom-slug"
                  className="min-w-0 flex-1 bg-slate-100/70 px-3.5 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />
              </div>
              <p className="mt-2 text-[10px] italic text-slate-500">
                Leave blank to generate a random unique identifier.
              </p>
            </div>

            <div className="rounded-md border border-brand-text/10 bg-brand-text/5 p-4">
              <div className="flex items-center gap-2 text-brand-text">
                <Eye size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Live Preview
                </span>
              </div>
              <p className="mt-2 pl-5.5 text-sm font-medium text-slate-800">
                Your short link will be:{" "}
                <span className="font-bold text-brand-text">
                  https://short.link/my-custom-slug
                </span>
              </p>
            </div>
            <div className="flex items-center gap-6 pt-1">
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-md bg-linear-to-r from-brand-text to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-text/25 transition hover:opacity-90"
              >
                Create Link
                <Zap size={14} fill="currentColor" />
              </button>
              <button
                type="button"
                className="text-sm font-medium text-brand-text transition hover:underline"
              >
                Cancel
              </button>
            </div>
          </div>
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
