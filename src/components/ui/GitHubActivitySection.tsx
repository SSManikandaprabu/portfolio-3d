import { useState } from "react";
import { Activity, GitBranch, Star } from "lucide-react";
import { PROFILE } from "../../data/profile";
import type { GitHubStatsState } from "../../hooks/useGitHubData";
import { SectionHeading } from "./SectionHeading";
import { TiltCard } from "./TiltCard";

function cellColor(count: number) {
  if (count <= 0) return "bg-slate-900/90 border-slate-800/80";
  if (count <= 2) return "bg-cyan-950 border-cyan-800/60";
  if (count <= 4) return "bg-cyan-600/80 border-cyan-400/50";
  if (count <= 7) return "bg-purple-500/85 border-purple-300/60";
  return "bg-fuchsia-400 border-white/60 shadow-[0_0_8px_rgba(232,121,249,0.7)]";
}

export function GitHubActivitySection({ data }: { data: GitHubStatsState }) {
  const [hoveredDay, setHoveredDay] = useState<{
    date: string;
    count: number;
  } | null>(null);

  return (
    <section id="github" className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="04 // Telemetry & Contributions"
        title="GitHub Activity"
        subtitle="Live statistics from GitHub REST API paired with your verified 53-week contribution calendar."
      />

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Live Metrics & Languages */}
        <TiltCard className="p-6 lg:col-span-5" glowColor="purple">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-white">
              @{PROFILE.handle}
            </h3>
            <span
              className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] ${
                data.isLive
                  ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30"
                  : "bg-slate-800 text-slate-300"
              }`}
            >
              {data.loading ? "Syncing..." : data.isLive ? "Live API" : "Verified Snapshot"}
            </span>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 text-center">
              <GitBranch className="mx-auto h-4 w-4 text-cyan-400" />
              <p className="mt-2 font-display text-xl font-bold text-white">
                {data.publicRepos}
              </p>
              <p className="text-[11px] text-slate-400">Public Repos</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 text-center">
              <Activity className="mx-auto h-4 w-4 text-purple-400" />
              <p className="mt-2 font-display text-xl font-bold text-white">
                {data.totalContributions}
              </p>
              <p className="text-[11px] text-slate-400">1Y Commits</p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 text-center">
              <Star className="mx-auto h-4 w-4 text-amber-300" />
              <p className="mt-2 font-display text-xl font-bold text-white">
                {data.totalStars}
              </p>
              <p className="text-[11px] text-slate-400">Total Stars</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="mb-3 font-mono text-xs uppercase tracking-wider text-slate-400">
              Top Repository Languages
            </p>
            <div className="space-y-2.5">
              {data.topLanguages.map((lang) => (
                <div key={lang.name}>
                  <div className="mb-1 flex justify-between font-mono text-xs">
                    <span className="text-slate-200">{lang.name}</span>
                    <span className="text-cyan-300">{lang.percent}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-900">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
                      style={{ width: `${lang.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TiltCard>

        {/* 53-week Contribution Heatmap */}
        <TiltCard className="p-6 lg:col-span-7" glowColor="cyan">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="font-display text-lg font-bold text-white">
                53-Week Contribution Matrix
              </h3>
              <p className="font-mono text-xs text-slate-400">
                {hoveredDay
                  ? `${hoveredDay.date}: ${hoveredDay.count} contribution(s)`
                  : `${data.totalContributions} contributions in the last 12 months`}
              </p>
            </div>

            <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-400">
              <span>Less</span>
              <span className="h-3 w-3 rounded-sm border border-slate-800 bg-slate-900" />
              <span className="h-3 w-3 rounded-sm bg-cyan-950" />
              <span className="h-3 w-3 rounded-sm bg-cyan-600/80" />
              <span className="h-3 w-3 rounded-sm bg-purple-500/85" />
              <span className="h-3 w-3 rounded-sm bg-fuchsia-400" />
              <span>More</span>
            </div>
          </div>

          <div className="overflow-x-auto pb-2">
            <div className="inline-flex gap-1">
              {data.weeks.slice(-52).map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1">
                  {week.contributionDays.map((day) => (
                    <button
                      key={day.date}
                      type="button"
                      aria-label={`${day.date}: ${day.contributionCount} contributions`}
                      onMouseEnter={() =>
                        setHoveredDay({
                          date: day.date,
                          count: day.contributionCount,
                        })
                      }
                      onFocus={() =>
                        setHoveredDay({
                          date: day.date,
                          count: day.contributionCount,
                        })
                      }
                      className={`h-3 w-3 rounded-[3px] border transition-transform hover:scale-125 ${cellColor(
                        day.contributionCount
                      )}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {data.recentRepos.length > 0 && (
            <div className="mt-6 border-t border-slate-800/80 pt-4">
              <p className="mb-3 font-mono text-xs uppercase tracking-wider text-slate-400">
                Recently Active Repositories
              </p>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {data.recentRepos.slice(0, 4).map((repo) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 transition hover:border-cyan-400/40"
                  >
                    <p className="truncate font-mono text-xs font-semibold text-cyan-300">
                      {repo.name}
                    </p>
                    <p className="mt-1 truncate text-[11px] text-slate-400">
                      {repo.description || repo.language || "Repository"}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          )}
        </TiltCard>
      </div>
    </section>
  );
}
