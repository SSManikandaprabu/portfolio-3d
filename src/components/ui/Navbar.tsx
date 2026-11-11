import { useState } from "react";
import { Cpu, Menu, Sparkles, X } from "lucide-react";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#github", label: "GitHub" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#achievements", label: "Achievements" },
  { href: "#contact", label: "Contact" },
];

export function Navbar({
  lowPower,
  onToggleLowPower,
}: {
  lowPower: boolean;
  onToggleLowPower: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 py-3 sm:px-6">
      <nav
        aria-label="Primary Navigation"
        className="glass-panel mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-2.5 sm:px-6"
      >
        <a
          href="#hero"
          className="flex items-center gap-2.5 font-display text-sm font-bold tracking-wider text-white"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/30 to-purple-500/30 ring-1 ring-cyan-400/40">
            <Cpu className="h-4 w-4 text-cyan-300" />
          </span>
          <span className="hidden sm:inline">SS.MANIKANDA</span>
          <span className="text-cyan-400">.3D</span>
        </a>

        <div className="hidden items-center gap-5 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-medium tracking-wide text-slate-300 transition-colors hover:text-cyan-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleLowPower}
            title="Toggle 3D performance mode"
            className="flex items-center gap-1.5 rounded-xl border border-cyan-500/25 bg-slate-900/70 px-3 py-1.5 font-mono text-[11px] text-cyan-300 transition hover:border-cyan-400/60"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>{lowPower ? "2D Lite" : "3D Full"}</span>
          </button>

          <button
            type="button"
            aria-label="Toggle Menu"
            onClick={() => setOpen((v) => !v)}
            className="rounded-xl border border-slate-700/70 p-2 text-slate-200 lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="glass-panel mx-auto mt-2 max-w-7xl rounded-2xl p-4 lg:hidden">
          <div className="grid grid-cols-2 gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-slate-200 transition hover:bg-cyan-500/10 hover:text-cyan-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
