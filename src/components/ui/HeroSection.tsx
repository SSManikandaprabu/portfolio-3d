import { Component, ErrorInfo, lazy, ReactNode, Suspense, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  Boxes,
  Brain,
  ExternalLink,
  Github,
  Globe,
  Monitor,
  Orbit,
  Palette,
  Terminal as TerminalIcon,
} from "lucide-react";
import { PROFILE } from "../../data/profile";
import type { CameraFocus, ThemeId } from "../canvas/HeroScene";
import { sounds } from "../../utils/sound";

const LazyHeroScene = lazy(() =>
  import("../canvas/HeroScene").then((m) => ({ default: m.HeroScene }))
);

class CanvasErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(_err: Error, _info: ErrorInfo) {}
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

const FOCUS_OPTIONS: { id: CameraFocus; label: string; icon: typeof Monitor }[] = [
  { id: "overview", label: "Workspace", icon: Orbit },
  { id: "monitor", label: "Code Screen", icon: Monitor },
  { id: "brain", label: "AI Brain", icon: Brain },
  { id: "blockchain", label: "Blockchain", icon: Boxes },
  { id: "globe", label: "Globe", icon: Globe },
];

const THEME_OPTIONS: { id: ThemeId; label: string; color: string }[] = [
  { id: "neon", label: "Neon", color: "bg-cyan-400" },
  { id: "matrix", label: "Matrix", color: "bg-emerald-400" },
  { id: "amber", label: "Gold", color: "bg-amber-400" },
  { id: "cyber", label: "Plasma", color: "bg-purple-400" },
];

function FallbackBackdrop() {
  return (
    <div className="cyber-grid-bg relative h-full w-full overflow-hidden bg-gradient-to-b from-[#070b1e] via-void to-void">
      <img
        src="./workspace-3d.jpg"
        alt="3D Isometric Developer Workspace"
        className="h-full w-full object-cover object-center opacity-55"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-void/70 via-void/30 to-void" />
    </div>
  );
}

export function HeroSection({
  lowPower,
  reducedMotion,
  theme,
  onThemeChange,
  onOpenTerminal,
}: {
  lowPower: boolean;
  reducedMotion: boolean;
  theme: ThemeId;
  onThemeChange: (t: ThemeId) => void;
  onOpenTerminal: () => void;
}) {
  const [focus, setFocus] = useState<CameraFocus>("overview");
  const [zeroGravity, setZeroGravity] = useState(false);

  function handleObjectClick(objectId: string) {
    if (objectId === "monitor") {
      onOpenTerminal();
    } else if (objectId === "brain") {
      setFocus("brain");
    } else if (objectId === "blockchain") {
      setFocus("blockchain");
    } else if (objectId === "globe") {
      setFocus("globe");
    } else if (objectId === "astronaut") {
      setFocus("overview");
    }
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden pt-20"
    >
      {/* 3D Canvas Layer */}
      <div className="absolute inset-0 z-0">
        {lowPower ? (
          <FallbackBackdrop />
        ) : (
          <CanvasErrorBoundary fallback={<FallbackBackdrop />}>
            <Suspense fallback={<FallbackBackdrop />}>
              <LazyHeroScene
                focus={focus}
                reducedMotion={reducedMotion}
                theme={theme}
                zeroGravity={zeroGravity}
                onObjectClick={handleObjectClick}
              />
            </Suspense>
          </CanvasErrorBoundary>
        )}
        {/* Subtle readability vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-void/25 to-void/70" />
      </div>

      {zeroGravity && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20 pointer-events-none rounded-full border border-purple-500/50 bg-slate-950/85 px-4 py-1.5 font-mono text-xs text-purple-300 shadow-xl shadow-purple-500/20 backdrop-blur-md animate-bounce">
          🌌 ZERO-GRAVITY ENGAGED · ORBITAL PHYSICS ACTIVE
        </div>
      )}

      {/* Top Overlay Header */}
      <div className="relative z-10 mx-auto mt-4 w-full max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-slate-950/75 px-3.5 py-1.5 backdrop-blur-md">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span className="font-mono text-xs text-cyan-200">
              @{PROFILE.handle} · Open to SWE Internships
            </span>
          </div>

          <h1 className="metallic-text font-display text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            {PROFILE.name}
          </h1>

          <p className="mt-3 font-mono text-xs font-semibold tracking-widest text-cyan-300 sm:text-sm">
            {PROFILE.role}
          </p>

          <p className="mt-3 text-base text-slate-300 sm:text-lg">
            &ldquo;{PROFILE.tagline}&rdquo;
          </p>

          {/* Action Row */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                sounds.warp();
                onOpenTerminal();
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition hover:brightness-110 active:scale-95"
            >
              <TerminalIcon className="h-4 w-4" />
              Launch CLI Terminal
            </button>

            <a
              href="#projects"
              onClick={() => sounds.click()}
              className="glass-panel inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-cyan-400/50"
            >
              Explore 3D Projects
              <ExternalLink className="h-4 w-4 text-cyan-300" />
            </a>

            <a
              href={PROFILE.githubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => sounds.click()}
              className="glass-panel inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-cyan-400/50 hover:text-white"
            >
              <Github className="h-4 w-4 text-cyan-300" />
              GitHub
            </a>
          </div>

          {/* Interactive 3D Hint Badge */}
          <div className="mt-4 inline-flex items-center gap-2 text-xs text-cyan-300/80 font-mono">
            <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>Interactive 3D Workspace: Click Monitor, Brain, or Cubes to explore</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom Camera & Theme Controls */}
      <div className="relative z-10 mx-auto mb-6 flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 lg:flex-row sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          {!lowPower && (
            <div className="glass-panel flex flex-wrap items-center gap-1.5 rounded-2xl p-1.5">
              <span className="px-2 font-mono text-[11px] text-slate-400">
                CAMERA:
              </span>
              {FOCUS_OPTIONS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    sounds.click();
                    setFocus(id);
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition ${
                    focus === id
                      ? "bg-cyan-500/25 text-cyan-200 ring-1 ring-cyan-400/50"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </button>
              ))}
            </div>
          )}

          {/* Zero-G Physics Toggle */}
          {!lowPower && (
            <button
              type="button"
              onClick={() => {
                sounds.warp();
                setZeroGravity((v) => !v);
              }}
              title="Toggle Zero-Gravity Space Physics"
              className={`inline-flex items-center gap-1.5 rounded-2xl px-3 py-2 font-mono text-xs font-medium transition ${
                zeroGravity
                  ? "bg-purple-500/30 text-purple-200 ring-2 ring-purple-400 shadow-lg shadow-purple-500/30"
                  : "glass-panel text-slate-300 hover:text-white hover:border-cyan-400/50"
              }`}
            >
              <Orbit className={`h-3.5 w-3.5 ${zeroGravity ? "animate-spin text-purple-300" : "text-cyan-400"}`} />
              <span>Zero-G: {zeroGravity ? "ON" : "OFF"}</span>
            </button>
          )}

          {/* Theme Palette Switcher */}
          {!lowPower && (
            <div className="glass-panel flex items-center gap-1.5 rounded-2xl p-1.5">
              <span className="flex items-center gap-1 px-2 font-mono text-[11px] text-slate-400">
                <Palette className="h-3 w-3" />
                THEME:
              </span>
              {THEME_OPTIONS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    sounds.success();
                    onThemeChange(t.id);
                  }}
                  title={`Switch to ${t.label} 3D Lighting`}
                  className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-medium transition ${
                    theme === t.id
                      ? "bg-white/15 text-white ring-1 ring-cyan-400/60"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${t.color}`} />
                  <span className="hidden sm:inline">{t.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <a
          href="#about"
          onClick={() => sounds.click()}
          className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-950/70 px-4 py-2 text-xs text-slate-300 backdrop-blur-md transition hover:border-cyan-400/50 hover:text-cyan-200"
        >
          <span>Scroll to Specs</span>
          <ArrowDown className="h-3.5 w-3.5 animate-bounce text-cyan-400" />
        </a>
      </div>
    </section>
  );
}
