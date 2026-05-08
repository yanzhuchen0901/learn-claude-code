import { NextResponse } from "next/server";

export interface DashboardStats {
  totalVersions: number;
  totalTools: number;
  totalLoc: number;
  completedSessions: number;
  learningProgress: number;
}

export interface ActivityItem {
  id: string;
  type: "version_viewed" | "session_completed" | "comparison_made" | "simulator_run";
  title: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, string | number>;
}

export interface DashboardData {
  stats: DashboardStats;
  recentActivity: ActivityItem[];
}

export async function GET(): Promise<NextResponse<DashboardData>> {
  // In a production app, this would pull from a database.
  // For this demo, we return structured data based on the learning platform's content.
  const stats: DashboardStats = {
    totalVersions: 12,
    totalTools: 28,
    totalLoc: 1247,
    completedSessions: 0,
    learningProgress: 0,
  };

  const recentActivity: ActivityItem[] = [
    {
      id: "act-001",
      type: "version_viewed",
      title: "Viewed s01: The Agent Loop",
      description: "Learned about the minimal agent kernel ¡ª a while loop + one tool.",
      timestamp: new Date().toISOString(),
      metadata: { version: "s01" },
    },
    {
      id: "act-002",
      type: "version_viewed",
      title: "Viewed s02: Tools",
      description: "Explored tool dispatch map and how new tools register.",
      timestamp: new Date().toISOString(),
      metadata: { version: "s02" },
    },
  ];

  return NextResponse.json({ stats, recentActivity });
}
