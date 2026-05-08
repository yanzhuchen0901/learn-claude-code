# API Documentation

## Overview

The Learn Claude Code platform provides a set of RESTful API endpoints for dashboard data, user statistics, and learning activity tracking. All API responses are in JSON format.

## Base URL

```
http://localhost:3000/api
```

---

## Endpoints

### GET /api/dashboard

Returns dashboard statistics and recent user activity.

#### Response

**Status Code:** `200 OK`

**Content-Type:** `application/json`

```json
{
  "stats": {
    "totalVersions": 12,
    "totalTools": 28,
    "totalLoc": 1247,
    "completedSessions": 0,
    "learningProgress": 0
  },
  "recentActivity": [
    {
      "id": "act-001",
      "type": "version_viewed",
      "title": "Viewed s01: The Agent Loop",
      "description": "Learned about the minimal agent kernel \u2014 a while loop + one tool.",
      "timestamp": "2025-01-01T00:00:00.000Z",
      "metadata": {
        "version": "s01"
      }
    }
  ]
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `stats.totalVersions` | integer | Total number of learning versions available |
| `stats.totalTools` | integer | Total tools across all versions |
| `stats.totalLoc` | integer | Total lines of code across all versions |
| `stats.completedSessions` | integer | Number of sessions completed by the user |
| `stats.learningProgress` | integer | Overall learning progress percentage (0-100) |
| `recentActivity[].id` | string | Unique identifier for the activity |
| `recentActivity[].type` | string | Activity type (see Activity Types below) |
| `recentActivity[].title` | string | Short title of the activity |
| `recentActivity[].description` | string | Detailed description of what happened |
| `recentActivity[].timestamp` | string | ISO 8601 timestamp of the activity |
| `recentActivity[].metadata` | object (optional) | Additional context-specific data |

#### Activity Types

| Type | Description | Example Metadata |
|------|-------------|-----------------|
| `version_viewed` | User viewed a learning version | `{ "version": "s01" }` |
| `session_completed` | User completed a learning session | `{ "version": "s02", "duration": 300 }` |
| `comparison_made` | User compared two versions | `{ "fromVersion": "s01", "toVersion": "s02" }` |
| `simulator_run` | User ran the agent loop simulator | `{ "steps": 5, "version": "s01" }` |

#### Error Responses

**Status Code:** `500 Internal Server Error`

```json
{
  "error": "Internal server error",
  "message": "Failed to fetch dashboard data"
}
```

---

### Data Contracts (TypeScript)

```typescript
// Dashboard Stats
interface DashboardStats {
  totalVersions: number;
  totalTools: number;
  totalLoc: number;
  completedSessions: number;
  learningProgress: number;
}

// Activity Item
interface ActivityItem {
  id: string;
  type: "version_viewed" | "session_completed" | "comparison_made" | "simulator_run";
  title: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, string | number>;
}

// Dashboard Response
interface DashboardData {
  stats: DashboardStats;
  recentActivity: ActivityItem[];
}
```

---

### Data Contracts (Python)

```python
from dataclasses import dataclass, field
from typing import Optional


@dataclass
class DashboardStats:
    total_versions: int
    total_tools: int
    total_loc: int
    completed_sessions: int
    learning_progress: int


@dataclass
class ActivityItem:
    id: str
    type: str  # "version_viewed" | "session_completed" | "comparison_made" | "simulator_run"
    title: str
    description: str
    timestamp: str
    metadata: Optional[dict] = None


@dataclass
class DashboardData:
    stats: DashboardStats
    recent_activity: list[ActivityItem]
```

---

## Usage Examples

### cURL

```bash
# Fetch dashboard data
curl http://localhost:3000/api/dashboard

# Pretty-print with jq
curl -s http://localhost:3000/api/dashboard | jq .
```

### JavaScript / TypeScript (Client-side)

```typescript
const response = await fetch("/api/dashboard");
const data: DashboardData = await response.json();
console.log(data.stats.totalVersions);  // 12
```

### Python

```python
import requests

response = requests.get("http://localhost:3000/api/dashboard")
data = response.json()
print(f"Total versions: {data['stats']['totalVersions']}")
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-06-01 | Initial API documentation for dashboard endpoint |
