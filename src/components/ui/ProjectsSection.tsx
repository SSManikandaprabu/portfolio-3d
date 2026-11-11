import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Lock, X } from "lucide-react";
import { ProjectItem, PROJECTS } from "../../data/profile";
import { SectionHeading } from "./SectionHeading";
import { TiltCard } from "./TiltCard";

const FILTERS = ["All", "Systems", "Blockchain", "Full-Stack", "AI/ML"] as const;

export function ProjectsSection() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [active, setActive] = useState<ProjectItem | null>(null);

  const items =
    filter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="03 // Floating 3D Showcases"
        title="Featured Deployed Projects"
        subtitle="Six production systems shipped across client-side WebAssembly, Polygon smart contracts, real-time PWAs, and deep learning."
      />

      <div className="mb-8 flex flex-wrap gap-2">
        {FILTERS.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={`rounded-xl px-4 py-2 font-mono text-xs font-medium transition ${
              filter === cat
                ? "bg-gradient-to-r from-cyan-500/30 to-purple-500/30 text-white ring-1 ring-cyan-400/60"
                : "glass-panel text-slate-300 hover:text-cyan-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: idx * 0.06 }}
          >
            <TiltCard
              glowColor={project.accent}
              className="flex h-full flex-col justify-between p-6"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 font-mono text-[11px] text-cyan-300">
                    {project.category}
                  </span>
                  {project.isPrivateRepo && (
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-slate-400">
                      <Lock className="h-3 w-3" /> Private Repo
                    </span>
                  )}
                </div>

                <h3 className="mt-4 font-display text-2xl font-bold text-white">
                  {project.title}
                </h3>
                <p className="mt-1 text-xs font-medium text-purple-300">
                  {project.subtitle}
                </p>

                <ul className="mt-4 space-y-2 text-xs leading-relaxed text-slate-300">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-slate-700/80 bg-slate-900/80 px-2 py-0.5 font-mono text-[10px] text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800/80 pt-4">
                <div className="flex items-center gap-2">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg bg-cyan-500/20 px-3 py-1.5 font-mono text-xs font-semibold text-cyan-200 ring-1 ring-cyan-400/40 transition hover:bg-cyan-500/30"
                  >
                    Live Demo
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} GitHub`}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-700 px-3 py-1.5 font-mono text-xs text-slate-300 transition hover:border-cyan-400/50 hover:text-white"
                    >
                      <Github className="h-3.5 w-3.5" />
                      Code
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setActive(project)}
                  className="font-mono text-[11px] text-slate-400 underline-offset-4 hover:text-cyan-300 hover:underline"
                >
                  Specs
                </button>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
          onClick={() => setActive(null)}
        >
          <div
            className="glass-panel max-w-xl rounded-2xl p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="font-mono text-xs text-cyan-400">
                  {active.category}
                </span>
                <h3 className="mt-1 font-display text-2xl font-bold text-white">
                  {active.title}
                </h3>
                <p className="text-sm text-purple-300">{active.subtitle}</p>
              </div>
              <button
                type="button"
                aria-label="Close modal"
                onClick={() => setActive(null)}
                className="rounded-lg border border-slate-700 p-2 text-slate-300 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <ul className="mt-5 space-y-2.5 text-sm text-slate-200">
              {active.highlights.map((h) => (
                <li key={h} className="flex gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-2">
              {active.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-cyan-500/25 bg-cyan-500/10 px-2.5 py-1 font-mono text-xs text-cyan-200"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={active.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white"
              >
                Open Live Deployment
                <ArrowUpRight className="h-4 w-4" />
              </a>
              {active.githubUrl && (
                <a
                  href={active.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-600 px-4 py-2 text-sm text-slate-200 hover:border-cyan-400"
                >
                  <Github className="h-4 w-4" />
                  View Source
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
