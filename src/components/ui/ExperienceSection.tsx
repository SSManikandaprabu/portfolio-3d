import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { EXPERIENCES } from "../../data/profile";
import { SectionHeading } from "./SectionHeading";
import { TiltCard } from "./TiltCard";

export function ExperienceSection() {
  return (
    <section id="experience" className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="05 // 3D Career Timeline"
        title="Industry Experience"
        subtitle="Hands-on engineering across industrial automation, enterprise supply-chain systems, and full-stack web delivery."
      />

      <div className="relative space-y-6 before:absolute before:bottom-4 before:left-5 before:top-4 before:w-px before:bg-gradient-to-b before:from-cyan-400 before:via-purple-500 before:to-transparent md:before:left-8">
        {EXPERIENCES.map((exp, idx) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: idx * 0.08 }}
            className="relative pl-12 md:pl-20"
          >
            <span className="absolute left-3 top-6 flex h-5 w-5 items-center justify-center rounded-full bg-slate-950 ring-2 ring-cyan-400 md:left-6">
              <span className="h-2 w-2 rounded-full bg-cyan-300" />
            </span>

            <TiltCard
              className="p-6"
              glowColor={idx % 2 === 0 ? "cyan" : "purple"}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-0.5 font-mono text-[11px] text-purple-200">
                    {exp.tag}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-bold text-white">
                    {exp.role}
                  </h3>
                  <p className="mt-0.5 flex items-center gap-1.5 text-sm font-medium text-cyan-300">
                    <Briefcase className="h-4 w-4" />
                    {exp.company}
                  </p>
                </div>

                <div className="flex flex-col items-start gap-1 font-mono text-xs text-slate-400 sm:items-end">
                  <span className="inline-flex items-center gap-1.5 text-slate-200">
                    <Calendar className="h-3.5 w-3.5 text-cyan-400" />
                    {exp.period}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-purple-400" />
                    {exp.location}
                  </span>
                </div>
              </div>

              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                {exp.highlights.map((h) => (
                  <li key={h} className="flex gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
