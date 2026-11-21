import { useState } from "react";
import { ExternalLink, Laptop, RefreshCw, Smartphone, Tablet, X } from "lucide-react";
import { ProjectItem } from "../../data/profile";
import { sounds } from "../../utils/sound";

export function ProjectPreviewModal({
  project,
  onClose,
}: {
  project: ProjectItem | null;
  onClose: () => void;
}) {
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [iframeKey, setIframeKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  if (!project) return null;

  function reloadIframe() {
    sounds.click();
    setIsLoading(true);
    setIframeKey((k) => k + 1);
  }

  const deviceWidthClass =
    device === "mobile"
      ? "w-[390px] h-[720px] rounded-[40px] border-4 border-slate-700 shadow-2xl"
      : device === "tablet"
      ? "w-[768px] h-[80vh] rounded-2xl border-2 border-slate-700"
      : "w-full h-full rounded-b-xl";

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-2 backdrop-blur-md transition-all sm:p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-panel flex h-[92vh] w-[95vw] max-w-6xl flex-col overflow-hidden rounded-2xl border border-cyan-500/40 bg-[#070b1e]/95 shadow-2xl shadow-cyan-500/20"
      >
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 bg-slate-950/90 px-4 py-2.5">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-sm font-bold text-white">
                  {project.title}
                </h3>
                <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.2 font-mono text-[10px] text-cyan-300">
                  {project.category}
                </span>
              </div>
              <p className="hidden text-[11px] text-slate-400 sm:block">
                {project.subtitle}
              </p>
            </div>
          </div>

          {/* Device Mockup Toggle */}
          <div className="flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-900/80 p-1 font-mono text-xs">
            <button
              type="button"
              onClick={() => {
                sounds.click();
                setDevice("desktop");
              }}
              title="Desktop View (Full Screen)"
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 transition ${
                device === "desktop"
                  ? "bg-cyan-500/25 text-cyan-200 ring-1 ring-cyan-400/50"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Laptop className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Desktop</span>
            </button>
            <button
              type="button"
              onClick={() => {
                sounds.click();
                setDevice("tablet");
              }}
              title="Tablet View (768px)"
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 transition ${
                device === "tablet"
                  ? "bg-cyan-500/25 text-cyan-200 ring-1 ring-cyan-400/50"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Tablet className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Tablet</span>
            </button>
            <button
              type="button"
              onClick={() => {
                sounds.click();
                setDevice("mobile");
              }}
              title="Mobile View (390px)"
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 transition ${
                device === "mobile"
                  ? "bg-cyan-500/25 text-cyan-200 ring-1 ring-cyan-400/50"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>

          {/* Action Links & Close */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={reloadIframe}
              title="Reload frame"
              className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => sounds.warp()}
              className="inline-flex items-center gap-1 rounded-xl bg-cyan-500/20 px-3 py-1.5 font-mono text-xs font-medium text-cyan-200 ring-1 ring-cyan-400/40 transition hover:bg-cyan-500/30"
            >
              <span>Direct URL</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <button
              type="button"
              onClick={() => {
                sounds.click();
                onClose();
              }}
              className="rounded-xl border border-slate-700/80 p-1.5 text-slate-400 hover:bg-rose-500/20 hover:text-rose-300"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Browser Mockup URL Address Bar */}
        <div className="flex items-center gap-2 border-b border-slate-800/80 bg-slate-900/60 px-4 py-1.5 font-mono text-[11px] text-slate-400">
          <span className="text-emerald-400">🔒 https://</span>
          <span className="text-slate-200 truncate">
            {project.liveUrl.replace(/^https?:\/\//, "")}
          </span>
          {isLoading && (
            <span className="ml-auto text-xs text-cyan-400 animate-pulse">
              Connecting sandbox...
            </span>
          )}
        </div>

        {/* Live Device Sandbox Stage */}
        <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-slate-950 p-2 sm:p-4">
          <div className={`relative flex flex-col overflow-hidden bg-white transition-all duration-300 ${deviceWidthClass}`}>
            {/* Mobile Notch Bar */}
            {device === "mobile" && (
              <div className="relative z-20 flex h-6 w-full items-center justify-center bg-black">
                <div className="h-3.5 w-24 rounded-full bg-slate-800" />
              </div>
            )}

            <iframe
              key={iframeKey}
              src={project.liveUrl}
              title={`${project.title} Sandbox`}
              onLoad={() => setIsLoading(false)}
              className="h-full w-full flex-1 border-0 bg-white"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>

          {/* Quick Fallback Note */}
          <div className="pointer-events-none absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-slate-500">
            <span>Live Interactive Sandbox Mode</span>
            <span className="pointer-events-auto">
              If the site restricts iframe embeds:{" "}
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 underline hover:text-cyan-200"
              >
                Launch in new window ↗
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
