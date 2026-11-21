import { useState } from "react";
import { Cpu, Menu, Sparkles, Terminal as TerminalIcon, Volume2, VolumeX, X } from "lucide-react";
import { sounds } from "../../utils/sound";

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
  onOpenTerminal,
}: {
  lowPower: boolean;
  onToggleLowPower: () => void;
  onOpenTerminal: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(sounds.isMuted());

  function toggleSound() {
    const next = !isMuted;
    sounds.setMuted(next);
    setIsMuted(next);
    if (!next) sounds.success();
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 py-3 sm:px-6">
      <nav
        aria-label="Primary Navigation"
        className="glass-panel mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-4 py-2.5 sm:px-6"
      >
        <a
          href="#hero"
          onClick={() => sounds.click()}
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
              onClick={() => sounds.click()}
              className="text-xs font-medium tracking-wide text-slate-300 transition-colors hover:text-cyan-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* CLI Terminal Shortcut */}
          <button
            type="button"
            onClick={() => {
              sounds.warp();
              onOpenTerminal();
            }}
            title="Open Interactive CLI Terminal"
            className="flex items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-cyan-950/40 px-2.5 py-1.5 font-mono text-[11px] text-cyan-300 transition hover:border-cyan-400 hover:bg-cyan-500/20"
          >
            <TerminalIcon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Terminal</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            title={isMuted ? "Enable Sound FX" : "Mute Sound FX"}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-700/80 bg-slate-900/70 text-slate-300 transition hover:border-cyan-400/60 hover:text-cyan-300"
          >
            {isMuted ? (
              <VolumeX className="h-3.5 w-3.5 text-slate-500" />
            ) : (
              <Volume2 className="h-3.5 w-3.5 text-cyan-400" />
            )}
          </button>

          {/* 2D / 3D Mode Toggle */}
          <button
            type="button"
            onClick={() => {
              sounds.click();
              onToggleLowPower();
            }}
            title="Toggle 3D performance mode"
            className="flex items-center gap-1.5 rounded-xl border border-cyan-500/25 bg-slate-900/70 px-3 py-1.5 font-mono text-[11px] text-cyan-300 transition hover:border-cyan-400/60"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>{lowPower ? "2D Lite" : "3D Full"}</span>
          </button>

          <button
            type="button"
            aria-label="Toggle Menu"
            onClick={() => {
              sounds.click();
              setOpen((v) => !v);
            }}
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
                onClick={() => {
                  sounds.click();
                  setOpen(false);
                }}
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
