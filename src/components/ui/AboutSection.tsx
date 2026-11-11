import { motion } from "framer-motion";
import { Briefcase, Code2, Cpu, GraduationCap, MapPin } from "lucide-react";
import { PROFILE } from "../../data/profile";
import { SectionHeading } from "./SectionHeading";
import { TiltCard } from "./TiltCard";

export function AboutSection({ publicRepos }: { publicRepos: number }) {
  const stats = [
    { label: "B.Tech CSE CGPA", value: "8.44 / 10", icon: GraduationCap },
    { label: "Public GitHub Repos", value: String(publicRepos), icon: Code2 },
    { label: "Deployed Products", value: "6 Flagships", icon: Cpu },
    { label: "Industry Internships", value: "3 Completed", icon: Briefcase },
  ];

  return (
    <section id="about" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="01 // Identity & Vision"
        title="About Me"
        subtitle="Engineering privacy-first client-side systems, Polygon-backed verification platforms, and applied AI tools."
      />

      <div className="grid gap-6 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="lg:col-span-7"
        >
          <TiltCard className="h-full p-7 sm:p-9" glowColor="cyan">
            <div className="flex flex-wrap items-center gap-3 text-xs text-cyan-300">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono">
                <MapPin className="h-3.5 w-3.5" />
                {PROFILE.location}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 font-mono text-purple-200">
                SRM IST Chennai · 2024–2028
              </span>
            </div>

            <p className="mt-6 text-base leading-relaxed text-slate-200 sm:text-lg">
              {PROFILE.bio}
            </p>

            <div className="mt-6 grid gap-3 rounded-xl border border-slate-800/80 bg-slate-950/60 p-4 font-mono text-xs text-slate-300 sm:grid-cols-2">
              <div>
                <span className="text-slate-500">PRIMARY FOCUS:</span>
                <p className="mt-1 text-cyan-300">
                  Client-Side WASM · Full-Stack · Web3 · AI/ML
                </p>
              </div>
              <div>
                <span className="text-slate-500">AVAILABILITY:</span>
                <p className="mt-1 text-emerald-300">
                  Seeking Software Engineering Internships
                </p>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 lg:col-span-5">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
              >
                <TiltCard
                  className="flex h-full flex-col justify-between p-5"
                  glowColor={idx % 2 === 0 ? "purple" : "cyan"}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 ring-1 ring-cyan-400/30">
                    <Icon className="h-5 w-5 text-cyan-300" />
                  </div>
                  <div className="mt-5">
                    <p className="font-display text-2xl font-bold text-white sm:text-3xl">
                      {s.value}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">{s.label}</p>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
