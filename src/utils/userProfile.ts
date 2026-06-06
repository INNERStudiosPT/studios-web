"use client";

import posthog from "posthog-js";

export interface UserStats {
  gaming: number;
  esports: number;
  consulting: number;
  careers: number;
  about: number;
  projects: number;
}

const STORAGE_KEY = "inner_studios_user_profile";

const DEFAULT_STATS: UserStats = {
  gaming: 0,
  esports: 0,
  consulting: 0,
  careers: 0,
  about: 0,
  projects: 0,
};

export function getLocalProfileStats(): UserStats {
  if (typeof window === "undefined") return DEFAULT_STATS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULT_STATS, ...JSON.parse(raw) } : DEFAULT_STATS;
  } catch {
    return DEFAULT_STATS;
  }
}

export function saveLocalProfileStats(stats: UserStats) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error("Failed to save user profiling stats", e);
  }
}

export function recordPageVisit(category: keyof UserStats) {
  if (typeof window === "undefined") return;
  const stats = getLocalProfileStats();
  stats[category] += 1;
  saveLocalProfileStats(stats);

  // Send properties to PostHog instantly
  const properties: Record<string, any> = {};
  properties[`visit_count_${category}`] = stats[category];
  properties["preferred_interest"] = getPredominantInterest(stats);
  
  posthog.setPersonProperties(properties);
  posthog.capture("interest_profile_updated", {
    updated_category: category,
    total_visits: stats[category],
  });
}

export function recordActionClick(category: keyof UserStats, actionName: string) {
  if (typeof window === "undefined") return;
  const stats = getLocalProfileStats();
  // Action clicks carry more weight than page loads
  stats[category] += 2;
  saveLocalProfileStats(stats);

  const properties: Record<string, any> = {};
  properties[`visit_count_${category}`] = stats[category];
  properties["preferred_interest"] = getPredominantInterest(stats);

  posthog.setPersonProperties(properties);
  posthog.capture("user_action_clicked", {
    category,
    action: actionName,
    weight: 2,
  });
}

export function getPredominantInterest(statsInput?: UserStats): keyof UserStats | "none" {
  const stats = statsInput || getLocalProfileStats();
  let maxVal = 0;
  let maxCat: keyof UserStats | "none" = "none";

  for (const key in stats) {
    const value = stats[key as keyof UserStats];
    if (value > maxVal) {
      maxVal = value;
      maxCat = key as keyof UserStats;
    }
  }

  return maxVal > 0 ? maxCat : "none";
}
