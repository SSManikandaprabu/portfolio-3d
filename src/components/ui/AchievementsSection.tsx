import { motion } from "framer-motion";
import { Award, ShieldCheck, Trophy } from "lucide-react";
import { ACHIEVEMENTS } from "../../data/profile";
import { SectionHeading } from "./SectionHeading";
import { TiltCard } from "./TiltCard";

export function AchievementsSection() {
  return (
    <section id="achievements" className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="07 // Credentials & Recognition"
        title="Certifications & Leadership"
        subtitle="Verified technical coursework, edge AI training, national student leadership, and quiz competitions."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ACHIEVEMENTS.map((item, idx) => {
          const Icon =
            item.kind === "Leadership"
              ? ShieldCheck
              : item.kind === "Competition"
                ? Trophy
                : Award;

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <TiltCard
                className="flex h-full flex-col justify-between p-5"
                glowColor={
                  item.kind === "Leadership"
                    ? "purple"
                    : item.kind === "Competition"
                      ? "blue"
                      : "cyan"
                }
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 font-mono text-[10px] text-cyan-300">
                      {item.kind}
                    </span>
                    <Icon className="h-4 w-4 text-purple-300" />
                  </div>
                  <h3 className="mt-3 font-display text-sm font-bold leading-snug text-white">
                    {item.title}
                  </h3>
                </div>

                <div className="mt-4 border-t border-slate-800/80 pt-3 font-mono text-[11px] text-slate-400">
                  <p className="text-slate-300">{item.issuer}</p>
                  <p className="mt-0.5 text-cyan-400">{item.date}</p>
                </div>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
