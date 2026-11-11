import { motion } from "framer-motion";
import { BookOpen, GraduationCap } from "lucide-react";
import { PROFILE } from "../../data/profile";
import { SectionHeading } from "./SectionHeading";
import { TiltCard } from "./TiltCard";

export function EducationSection() {
  const { education } = PROFILE;

  return (
    <section id="education" className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="06 // Academic Foundation"
        title="Education"
        subtitle="Undergraduate engineering track focused on algorithms, operating systems, DBMS, and artificial intelligence."
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5 }}
      >
        <TiltCard className="p-7 sm:p-9" glowColor="blue">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/25 to-blue-600/25 ring-1 ring-cyan-400/40">
                <GraduationCap className="h-7 w-7 text-cyan-300" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-white">
                  {education.institution}
                </h3>
                <p className="mt-1 text-base text-cyan-200">{education.degree}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-xl border border-slate-700 bg-slate-950/70 px-3.5 py-2 font-mono text-xs text-slate-300">
                {education.period}
              </span>
              <span className="rounded-xl border border-cyan-400/40 bg-cyan-500/15 px-4 py-2 font-mono text-sm font-bold text-cyan-200">
                CGPA: {education.cgpa}
              </span>
            </div>
          </div>

          <div className="mt-7 border-t border-slate-800/80 pt-6">
            <p className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-slate-400">
              <BookOpen className="h-4 w-4 text-purple-400" />
              Core Coursework
            </p>
            <div className="flex flex-wrap gap-2">
              {education.coursework.map((course) => (
                <span
                  key={course}
                  className="rounded-xl border border-slate-700/80 bg-slate-950/70 px-3.5 py-1.5 text-xs font-medium text-slate-200 transition hover:border-cyan-400/50"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </TiltCard>
      </motion.div>
    </section>
  );
}
