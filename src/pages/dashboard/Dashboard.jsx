import { useState, useEffect } from "react";
import { Link, useLocation, useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  Link2,
  Calendar,
  BarChart3,
  Copy,
  Check,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Plus,
  ExternalLink,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import {
  getLinksAction,
  deleteLinkAction,
  resetLinkStatus,
} from "../../redux/slices/link/linkSlice";
import { toast } from "react-toastify";

const Dashboard = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const urlSearch = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;

  const { links, pagination, isLoading, isDeleting, error, successMessage } =
    useSelector((state) => state.link);

  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [prevSearchParam, setPrevSearchParam] = useState(urlSearch);
  const [isDebouncing, setIsDebouncing] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [flashMessage, setFlashMessage] = useState(
    location.state?.successMessage || "",
  );

  // Sync state if URL search param changed externally
  if (urlSearch !== prevSearchParam) {
    setPrevSearchParam(urlSearch);
    setSearchQuery(urlSearch);
    setIsDebouncing(false);
  }

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim() !== urlSearch) {
      setIsDebouncing(true);
    } else {
      setIsDebouncing(false);
    }
  };

  // Debounce search query updates to URL parameter with 3000ms delay
  // Sync state if URL search params change externally (e.g. back/forward button)
  useEffect(() => {
    const currentParam = searchParams.get("search") || "";

    if (searchQuery.trim() === currentParam) {
      return;
    }

    const timer = setTimeout(() => {
      const newParams = new URLSearchParams(searchParams);
      if (searchQuery.trim()) {
        newParams.set("search", searchQuery.trim());
        newParams.set("page", "1");
      } else {
        newParams.delete("search");
      }
      setSearchParams(newParams, { replace: true });
      setIsDebouncing(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery, searchParams, setSearchParams]);

  useEffect(() => {
    dispatch(getLinksAction({ page, limit: 10 }));
  }, [dispatch, page]);

  useEffect(() => {
    if (flashMessage) {
      toast.success(flashMessage);
      const timer = setTimeout(() => setFlashMessage(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [flashMessage]);

  const handleCopy = (id, shortUrl) => {
    navigator.clipboard.writeText(shortUrl);
    setCopiedId(id);
    toast.success("Short link copied to clipboard!");
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this short link?")) {
      const res = await dispatch(deleteLinkAction(id));
      if (deleteLinkAction.fulfilled.match(res)) {
        toast.success("Link deleted successfully!");
      } else {
        toast.error("Failed to delete link.");
      }
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setIsDebouncing(false);
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("search");
    newParams.set("page", "1");
    setSearchParams(newParams, { replace: true });
  };

  const handlePageChange = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", newPage.toString());
    setSearchParams(newParams);
  };

  const filteredLinks = links.filter((link) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      link.slug?.toLowerCase().includes(q) ||
      link.original_url?.toLowerCase().includes(q) ||
      link.short_url?.toLowerCase().includes(q)
    );
  });

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="flex-1 bg-brand-background px-4 py-10 font-sans antialiased">
      <div className="mx-auto w-full max-w-3xl">
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              My Links
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              Manage and track your shortened digital assets.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                Total Active
              </p>
              <p className="text-xl font-extrabold leading-tight text-brand-text">
                {pagination.total_items ?? links.length}
              </p>
            </div>
          </div>
        </div>

        {/* Flash Message */}
        {(flashMessage || successMessage) && (
          <div className="mt-5 flex items-center justify-between gap-2.5 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
              <span>{flashMessage || successMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setFlashMessage("");
                dispatch(resetLinkStatus());
              }}
              className="text-emerald-600 hover:text-emerald-800 text-xs font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mt-5 flex items-center justify-between gap-2.5 rounded-md border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            <div className="flex items-center gap-2">
              <AlertCircle size={16} className="text-red-500 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              type="button"
              onClick={() => dispatch(resetLinkStatus())}
              className="text-red-600 hover:text-red-800 text-xs font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* Search Bar */}
        <div className="mt-6 flex items-center gap-3 rounded-lg border border-slate-200 bg-brand-content px-4 py-3">
          <Search size={16} className="shrink-0 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by slug or URL..."
            className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />
          {isDebouncing && (
            <span className="flex items-center gap-1.5 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-600 animate-pulse">
              <Loader2 size={11} className="animate-spin" />
              Syncing (3s)...
            </span>
          )}
          {searchQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Links List */}
        <div className="mt-8 space-y-3">
          {isLoading && links.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-500">
              <Loader2 size={28} className="animate-spin text-blue-600 mb-3" />
              <p className="text-xs">Loading your links...</p>
            </div>
          ) : filteredLinks.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-white py-14 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <Link2 size={24} />
              </div>
              <h3 className="text-sm font-bold text-slate-800">
                {searchQuery ? "No matching links found" : "No short links yet"}
              </h3>
              <p className="mt-1 max-w-sm text-xs text-slate-500">
                {searchQuery
                  ? "Try searching with a different keyword or slug."
                  : "You haven't created any short links yet. Start shortening long URLs now."}
              </p>
              {!searchQuery && (
                <Link
                  to="/create-link"
                  className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition"
                >
                  <Plus size={14} />
                  Create First Link
                </Link>
              )}
            </div>
          ) : (
            filteredLinks.map((link) => (
              <div
                key={link.id}
                className="flex items-center justify-between gap-4 rounded-lg border border-slate-100 bg-brand-content px-4 py-4 shadow-[0_1px_4px_rgb(15,23,42,0.04)] hover:border-slate-200 transition"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-brand-text">
                    <Link2 size={13} strokeWidth={2.5} />
                    <a
                      href={link.short_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-blue-600 hover:underline inline-flex items-center gap-1"
                      title="Open short link"
                    >
                      <span className="truncate max-w-55 sm:max-w-md">
                        {link.short_url}
                      </span>
                      <ExternalLink
                        size={11}
                        className="shrink-0 text-slate-400"
                      />
                    </a>
                  </div>

                  <p
                    className="mt-1 truncate text-xs text-slate-700"
                    title={link.original_url}
                  >
                    {link.original_url}
                  </p>

                  <div className="mt-2 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={11} />
                      {formatDate(link.created_at)}
                    </span>
                    <span className="flex items-center gap-1">
                      <BarChart3 size={11} />
                      {link.click_count ?? 0} clicks
                    </span>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopy(link.id, link.short_url)}
                    aria-label="Copy short link"
                    className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-text/10 text-brand-text transition hover:bg-brand-text/20 cursor-pointer"
                    title={copiedId === link.id ? "Copied!" : "Copy URL"}
                  >
                    {copiedId === link.id ? (
                      <Check size={15} className="text-emerald-600" />
                    ) : (
                      <Copy size={15} />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(link.id)}
                    disabled={isDeleting}
                    aria-label="Delete link"
                    className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition hover:bg-red-50 hover:text-red-600 cursor-pointer disabled:opacity-50"
                    title="Delete link"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {pagination.total_pages > 1 && (
          <div className="mt-10 flex items-center justify-between text-xs text-slate-500">
            <button
              type="button"
              disabled={page <= 1 || isLoading}
              onClick={() => handlePageChange(Math.max(1, page - 1))}
              className="flex items-center gap-1 font-medium transition hover:text-slate-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft size={13} />
              Prev Page
            </button>

            <div className="flex items-center gap-3">
              <span className="rounded bg-brand-text/10 px-2 py-1 font-bold text-brand-text">
                {page}
              </span>
              <span className="text-slate-400">of</span>
              <span className="font-semibold text-slate-900">
                {pagination.total_pages}
              </span>
            </div>

            <button
              type="button"
              disabled={page >= pagination.total_pages || isLoading}
              onClick={() =>
                handlePageChange(Math.min(pagination.total_pages, page + 1))
              }
              className="flex items-center gap-1 font-medium transition hover:text-slate-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Next
              <ChevronRight size={13} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
