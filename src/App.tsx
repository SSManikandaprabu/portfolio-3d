import { useEffect, useState } from "react";
import { PROFILE } from "./data/profile";
import { useGitHubData } from "./hooks/useGitHubData";
import { CustomCursor } from "./components/ui/CustomCursor";
import { Navbar } from "./components/ui/Navbar";
import { HeroSection } from "./components/ui/HeroSection";
import { AboutSection } from "./components/ui/AboutSection";
import { SkillsSection } from "./components/ui/SkillsSection";
import { ProjectsSection } from "./components/ui/ProjectsSection";
import { GitHubActivitySection } from "./components/ui/GitHubActivitySection";
import { ExperienceSection } from "./components/ui/ExperienceSection";
import { EducationSection } from "./components/ui/EducationSection";
import { AchievementsSection } from "./components/ui/AchievementsSection";
import { ContactSection } from "./components/ui/ContactSection";
import { InteractiveTerminal } from "./components/ui/InteractiveTerminal";
import type { ThemeId } from "./components/canvas/HeroScene";
import { Terminal as TerminalIcon } from "lucide-react";

export function App() {
  const githubData = useGitHubData(PROFILE.handle);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [lowPower, setLowPower] = useState(false);
  const [theme, setTheme] = useState<ThemeId>("neon");
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useEffect(() => {
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqSmall = window.matchMedia("(max-width: 767px)");
    setReducedMotion(mqMotion.matches);
    if (mqMotion.matches || mqSmall.matches) {
      setLowPower(true);
    }
  }, []);

  // Global keyboard shortcut: Ctrl+K or Cmd+K or Backtick
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      } else if (e.key === "`" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-void text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      <CustomCursor disabled={reducedMotion || lowPower} />

      <Navbar
        lowPower={lowPower}
        onToggleLowPower={() => setLowPower((v) => !v)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      <main>
        <HeroSection
          lowPower={lowPower}
          reducedMotion={reducedMotion}
          theme={theme}
          onThemeChange={setTheme}
          onOpenTerminal={() => setIsTerminalOpen(true)}
        />
        <AboutSection publicRepos={githubData.publicRepos} />
        <SkillsSection />
        <ProjectsSection />
        <GitHubActivitySection data={githubData} lowPower={lowPower} />
        <ExperienceSection />
        <EducationSection />
        <AchievementsSection />
        <ContactSection />
      </main>

      {/* Floating CLI Terminal Toggle Button at bottom right */}
      <aside aria-label="Quick Actions" className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => setIsTerminalOpen(true)}
          title="Open Developer Terminal (Ctrl+K)"
          className="group flex items-center gap-2 rounded-2xl border border-cyan-400/40 bg-slate-950/85 px-4 py-3 font-mono text-xs text-cyan-300 shadow-xl shadow-cyan-500/20 backdrop-blur-md transition hover:scale-105 hover:border-cyan-300 hover:bg-cyan-950/40 active:scale-95"
        >
          <TerminalIcon className="h-4 w-4 transition group-hover:rotate-12" />
          <span className="font-semibold">CLI Terminal</span>
          <kbd className="hidden rounded bg-slate-800/80 px-1.5 py-0.5 text-[10px] text-slate-400 group-hover:text-cyan-200 sm:inline">
            Ctrl+K
          </kbd>
        </button>
      </aside>

      {/* Interactive Modal Terminal */}
      <InteractiveTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onSwitchTheme={(t) => {
          if (["neon", "matrix", "amber", "cyber"].includes(t)) {
            setTheme(t as ThemeId);
          }
        }}
      />

      <footer className="border-t border-slate-800/80 py-8 text-center font-mono text-xs text-slate-500">
        <p>
          Designed &amp; Engineered by{" "}
          <span className="text-cyan-300">{PROFILE.displayName}</span> ·{" "}
          <span>@{PROFILE.handle}</span>
        </p>
      </footer>
    </div>
  );
}

export default App;
