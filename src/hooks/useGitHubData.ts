import { useEffect, useState } from "react";
import contributionsSnapshot from "../data/contributions.json";

export interface GitHubRepoSummary {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics?: string[];
}

export interface LanguageStat {
  name: string;
  count: number;
  percent: number;
}

export interface GitHubStatsState {
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  topLanguages: LanguageStat[];
  recentRepos: GitHubRepoSummary[];
  totalContributions: number;
  weeks: {
    contributionDays: { date: string; contributionCount: number }[];
  }[];
  isLive: boolean;
  loading: boolean;
}

const FALLBACK_STATE: GitHubStatsState = {
  publicRepos: 79,
  followers: 0,
  following: 0,
  totalStars: 0,
  topLanguages: [
    { name: "TypeScript", count: 18, percent: 30 },
    { name: "JavaScript", count: 16, percent: 27 },
    { name: "Python", count: 12, percent: 20 },
    { name: "HTML", count: 9, percent: 15 },
    { name: "Solidity", count: 5, percent: 8 },
  ],
  recentRepos: [],
  totalContributions: contributionsSnapshot.totalContributions,
  weeks: contributionsSnapshot.weeks,
  isLive: false,
  loading: true,
};

export function useGitHubData(username: string): GitHubStatsState {
  const [state, setState] = useState<GitHubStatsState>(FALLBACK_STATE);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(
            `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
          ),
        ]);

        if (!userRes.ok || !reposRes.ok) {
          throw new Error("GitHub API rate limit or network error");
        }

        const userJson = await userRes.json();
        const reposJson: GitHubRepoSummary[] = await reposRes.json();

        const langCounts = new Map<string, number>();
        let totalStars = 0;

        for (const repo of reposJson) {
          totalStars += repo.stargazers_count ?? 0;
          if (repo.language) {
            langCounts.set(
              repo.language,
              (langCounts.get(repo.language) ?? 0) + 1
            );
          }
        }

        const sortedLangs = Array.from(langCounts.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6);
        const langSum = sortedLangs.reduce((acc, [, c]) => acc + c, 0) || 1;

        const topLanguages: LanguageStat[] = sortedLangs.map(([name, count]) => ({
          name,
          count,
          percent: Math.round((count / langSum) * 100),
        }));

        if (!cancelled) {
          setState({
            publicRepos: userJson.public_repos ?? FALLBACK_STATE.publicRepos,
            followers: userJson.followers ?? 0,
            following: userJson.following ?? 0,
            totalStars,
            topLanguages:
              topLanguages.length > 0 ? topLanguages : FALLBACK_STATE.topLanguages,
            recentRepos: reposJson.slice(0, 6),
            totalContributions: contributionsSnapshot.totalContributions,
            weeks: contributionsSnapshot.weeks,
            isLive: true,
            loading: false,
          });
        }
      } catch {
        if (!cancelled) {
          setState((prev) => ({ ...prev, loading: false, isLive: false }));
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [username]);

  return state;
}
