"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "@/lib/i18n";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DashboardData, ActivityItem } from "@/app/api/dashboard/route";

// ©¤©¤ Stat Card ©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤
function StatCard({
  label,
  value,
  icon,
  trend,
}: {
  label: string;
  value: string | number;
  icon: string;
  trend?: "up" | "down" | "neutral";
}) {
  return (
    <Card className="flex flex-col gap-1 p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-[var(--color-text-secondary)]">{label}</span>
        <span className="text-lg" aria-hidden="true">
          {icon}
        </span>
      </div>
      <span className="text-2xl font-bold tracking-tight">{value}</span>
      {trend && (
        <span
          className={cn(
            "text-xs",
            trend === "up" && "text-emerald-500",
            trend === "down" && "text-red-500",
            trend === "neutral" && "text-zinc-500"
          )}
        >
          {trend === "up" && "+"}
          {trend === "down" && "-"}
          {trend === "neutral" && "~"}{" "}
          {trend === "up" && "Improving"}
          {trend === "down" && "Needs attention"}
          {trend === "neutral" && "Steady"}
        </span>
      )}
    </Card>
  );
}

// ©¤©¤ Activity Feed ©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤
const ACTIVITY_ICONS: Record<ActivityItem["type"], string> = {
  version_viewed: "[viewed]",
  session_completed: "[done]",
  comparison_made: "[diff]",
  simulator_run: "[play]",
};

function ActivityFeed({ items }: { items: ActivityItem[] }) {
  if (items.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-[var(--color-text-secondary)]">No recent activity</p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <Card key={item.id} className="flex items-start gap-4 p-4">
          <span className="mt-0.5 font-mono text-xs text-[var(--color-text-secondary)] opacity-60" aria-hidden="true">
            {ACTIVITY_ICONS[item.type]}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">{item.title}</p>
            <p className="mt-0.5 text-xs text-[var(--color-text-secondary)] line-clamp-2">
              {item.description}
            </p>
            <p className="mt-1 text-xs text-[var(--color-text-secondary)] opacity-60">
              {new Date(item.timestamp).toLocaleString()}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}

// ©¤©¤ Progress Bar ©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤
function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
        <div
          className="h-full rounded-full bg-blue-500 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs tabular-nums text-[var(--color-text-secondary)] w-10 text-right">
        {pct}%
      </span>
    </div>
  );
}

// ©¤©¤ Dashboard Page ©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤
export default function DashboardPage() {
  const t = useTranslations("dashboard");
  const locale = useLocale();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await fetch("/api/dashboard");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: DashboardData = await res.json();
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  // ©¤©¤ Loading State ©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-300 border-t-blue-500" />
        <p className="mt-4 text-sm text-[var(--color-text-secondary)]">Loading dashboard...</p>
      </div>
    );
  }

  // ©¤©¤ Error State ©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤©¤
  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <p className="text-lg font-medium">Failed to load dashboard</p>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{error}</p>
        <Link
          href={`/${locale}/dashboard`}
          className="mt-4 text-sm text-blue-500 underline underline-offset-2 hover:text-blue-400"
        >
          Retry
        </Link>
      </div>
    );
  }

  const { stats, recentActivity } = data;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          User Dashboard
        </h1>
        <p className="mt-2 text-[var(--color-text-secondary)]">
          Track your learning progress and recent activity across all sessions.
        </p>
      </div>

      {/* Stats Grid */}
      <section className="mb-10">
        <h2 className="mb-4 text-lg font-semibold">Statistics</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard
            label="Versions"
            value={stats.totalVersions}
            icon="[V]"
            trend="neutral"
          />
          <StatCard
            label="Tools"
            value={stats.totalTools}
            icon="[T]"
            trend="up"
          />
          <StatCard
            label="Total LOC"
            value={stats.totalLoc.toLocaleString()}
            icon="[L]"
            trend="up"
          />
          <StatCard
            label="Progress"
            value={`${stats.completedSessions}/${stats.totalVersions}`}
            icon="[P]"
            trend="neutral"
          />
        </div>
      </section>

      {/* Learning Progress */}
      <section className="mb-10">
        <Card>
          <CardHeader>
            <CardTitle>Learning Progress</CardTitle>
          </CardHeader>
          <ProgressBar value={stats.completedSessions} max={stats.totalVersions} />
          <p className="mt-2 text-xs text-[var(--color-text-secondary)]">
            {stats.completedSessions} of {stats.totalVersions} sessions completed
          </p>
        </Card>
      </section>

      {/* Recent Activity */}
      <section>
        <h2 className="mb-4 text-lg font-semibold">Recent Activity</h2>
        <ActivityFeed items={recentActivity} />
      </section>
    </div>
  );
}
