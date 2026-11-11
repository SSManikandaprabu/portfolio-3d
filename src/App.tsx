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

export function App() {
  const githubData = useGitHubData(PROFILE.handle);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [lowPower, setLowPower] = useState(false);

  useEffect(() => {
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqSmall = window.matchMedia("(max-width: 767px)");
    setReducedMotion(mqMotion.matches);
    if (mqMotion.matches || mqSmall.matches) {
      setLowPower(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-void text-slate-100">
      <CustomCursor disabled={reducedMotion || lowPower} />
      <Navbar
        lowPower={lowPower}
        onToggleLowPower={() => setLowPower((v) => !v)}
      />

      <main>
        <HeroSection lowPower={lowPower} reducedMotion={reducedMotion} />
        <AboutSection publicRepos={githubData.publicRepos} />
        <SkillsSection />
        <ProjectsSection />
        <GitHubActivitySection data={githubData} lowPower={lowPower} />
        <ExperienceSection />
        <EducationSection />
        <AchievementsSection />
        <ContactSection />
      </main>

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
