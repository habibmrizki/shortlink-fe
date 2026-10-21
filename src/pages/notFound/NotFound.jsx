import { Link } from "react-router";
import {
  AlertTriangle,
  ArrowLeft,
  BarChart2,
  Code,
  Link as LinkIcon,
} from "lucide-react";

const links = [
  {
    title: "Check Analytics",
    description: "Track your active links and traffic sources in real-time.",
    icon: BarChart2,
  },
  {
    title: "New ShortLink",
    description: "Create a brand new shortened URL in seconds.",
    icon: LinkIcon,
  },
  {
    title: "Developer API",
    description: "Integrate our link infrastructure into your apps.",
    icon: Code,
  },
];

function NotFound() {
  return (
    <main className="flex flex-1 flex-col bg-slate-50 text-slate-900">
      <section className="flex flex-1 items-center justify-center px-6 py-14 sm:px-8">
        <div className="mx-auto flex gap-5 w-full max-w-2xl flex-col items-center text-center">
          <div className="relative mb-12 h-32 w-32">
            <div className="absolute inset-4 grid place-items-center rounded-full bg-slate-100 text-5xl font-extrabold text-slate-300">
              <span className="relative inline-block">
                <LinkIcon aria-hidden="true" />
                <span className="absolute top-1/2 left-1/2 h-1.5 w-16 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-slate-300" />
              </span>
            </div>
            <div className="absolute top-1 right-2 grid size-10 rotate-12 place-items-center rounded-lg bg-blue-600 text-white shadow-[0_14px_28px_rgba(37,99,235,0.26)]">
              <AlertTriangle className="text-lg" aria-hidden="true" />
            </div>
          </div>

          <div>
            <p className="text-4xl leading-none font-extrabold text-blue-700">
              404
            </p>
            <h1 className="mt-5 text-2xl font-extrabold tracking-normal text-[#20242a]">
              Page Not Found
            </h1>
            <p className="mt-4 max-w-md text-lg leading-7 text-slate-600">
              The page you're looking for doesn't exist. It may have been moved,
              deleted, or the link might be broken.
            </p>
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/admin"
              className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-7 text-base font-bold text-white shadow-[0_12px_24px_rgba(37,99,235,0.22)] transition hover:bg-blue-800 focus:ring-4 focus:ring-blue-100 focus:outline-none sm:w-auto"
            >
              <ArrowLeft className="text-xl" aria-hidden="true" />
              Go to Dashboard
            </Link>
            <a
              href="mailto:support@shortlink.test"
              className="inline-flex h-14 w-full items-center justify-center rounded-lg border border-slate-200 bg-white px-8 text-base font-bold text-blue-700 shadow-sm transition hover:border-blue-100 hover:bg-blue-50 focus:ring-4 focus:ring-blue-100 focus:outline-none sm:w-auto"
            >
              Report an Issue
            </a>
          </div>

          <div className=" grid w-full gap-6 sm:grid-cols-3">
            {links.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-lg border border-slate-100 bg-white px-6 py-7 text-left shadow-sm"
                >
                  <div className="flex flex-col gap-5">
                    <Icon
                      className="text-2xl text-blue-700"
                      aria-hidden="true"
                    />
                    <h2 className="text-base font-extrabold text-[#20242a]">
                      {item.title}
                    </h2>
                    <p className="text-sm leading-5 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

export default NotFound;
