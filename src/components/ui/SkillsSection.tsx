import { useState } from "react";
import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import { SKILL_GROUPS } from "../../data/profile";
import { SectionHeading } from "./SectionHeading";
import { TiltCard } from "./TiltCard";

export function SkillsSection() {
  const [selected, setSelected] = useState<string>("All");
  const categories = ["All", ...SKILL_GROUPS.map((g) => g.category)];

  const visibleGroups =
    selected === "All"
      ? SKILL_GROUPS
      : SKILL_GROUPS.filter((g) => g.category === selected);

  return (
    <section id="skills" className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="02 // Interactive Tech Matrix"
        title="Skills & Architecture Stack"
        subtitle="Hover any 3D card to inspect stack capabilities across systems, web, blockchain, and AI/ML."
      />

      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelected(cat)}
            className={`rounded-xl px-4 py-2 font-mono text-xs font-medium transition ${
              selected === cat
                ? "bg-gradient-to-r from-cyan-500/30 to-purple-500/30 text-white ring-1 ring-cyan-400/60"
                : "glass-panel text-slate-300 hover:text-cyan-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {visibleGroups.map((group, gIdx) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: gIdx * 0.07 }}
          >
            <TiltCard className="h-full p-6" glowColor={group.accent}>
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-display text-xl font-bold text-white">
                  {group.category}
                </h3>
                <Layers className="h-5 w-5 text-cyan-400" />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {group.items.map((skill) => (
                  <div
                    key={skill.name}
                    className="rounded-xl border border-slate-800/80 bg-slate-950/65 p-3.5 transition hover:border-cyan-400/40"
                  >
                    <p className="font-mono text-sm font-semibold text-cyan-200">
                      {skill.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">{skill.detail}</p>
                  </div>
                ))}
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
