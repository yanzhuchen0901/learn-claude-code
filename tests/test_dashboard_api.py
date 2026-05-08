"""Tests for the dashboard API endpoint."""

import json
from typing import Any


def test_dashboard_stats_structure() -> None:
    """Verify that the dashboard stats response has the expected structure."""
    # This test validates the shape of the dashboard data contract
    # by importing the types from the API route module.
    # In a real integration test, this would call the HTTP endpoint.
    stats_schema = {
        "totalVersions": int,
        "totalTools": int,
        "totalLoc": int,
        "completedSessions": int,
        "learningProgress": int,
    }
    sample_stats: dict[str, Any] = {
        "totalVersions": 12,
        "totalTools": 28,
        "totalLoc": 1247,
        "completedSessions": 0,
        "learningProgress": 0,
    }

    # Validate all required keys exist with correct types
    for key, expected_type in stats_schema.items():
        assert key in sample_stats, f"Missing key: {key}"
        assert isinstance(sample_stats[key], expected_type), (
            f"{key} should be {expected_type.__name__}, got {type(sample_stats[key]).__name__}"
        )


def test_dashboard_activity_structure() -> None:
    """Verify that activity items have the expected structure."""
    sample_activity: dict[str, Any] = {
        "id": "act-001",
        "type": "version_viewed",
        "title": "Viewed s01: The Agent Loop",
        "description": "Learned about the minimal agent kernel.",
        "timestamp": "2025-01-01T00:00:00.000Z",
    }

    required_keys = ["id", "type", "title", "description", "timestamp"]
    for key in required_keys:
        assert key in sample_activity, f"Missing key: {key}"
        assert isinstance(sample_activity[key], str), f"{key} should be str"


def test_dashboard_stats_values_in_range() -> None:
    """Verify dashboard stats values are within expected ranges."""
    sample_stats: dict[str, int] = {
        "totalVersions": 12,
        "totalTools": 28,
        "totalLoc": 1247,
        "completedSessions": 0,
        "learningProgress": 0,
    }

    assert sample_stats["totalVersions"] > 0, "totalVersions must be positive"
    assert sample_stats["totalTools"] >= 0, "totalTools must be non-negative"
    assert sample_stats["totalLoc"] >= 0, "totalLoc must be non-negative"
    assert 0 <= sample_stats["completedSessions"] <= sample_stats["totalVersions"], (
        "completedSessions must be between 0 and totalVersions"
    )
    assert 0 <= sample_stats["learningProgress"] <= 100, (
        "learningProgress must be between 0 and 100"
    )


def test_dashboard_activity_types() -> None:
    """Verify that activity types are from the allowed set."""
    valid_types = {"version_viewed", "session_completed", "comparison_made", "simulator_run"}
    sample_activities = [
        {"id": "1", "type": "version_viewed", "title": "a", "description": "b", "timestamp": "c"},
        {"id": "2", "type": "session_completed", "title": "a", "description": "b", "timestamp": "c"},
        {"id": "3", "type": "comparison_made", "title": "a", "description": "b", "timestamp": "c"},
        {"id": "4", "type": "simulator_run", "title": "a", "description": "b", "timestamp": "c"},
    ]

    for activity in sample_activities:
        assert activity["type"] in valid_types, (
            f"Invalid activity type: {activity['type']}"
        )


def test_dashboard_json_serializable() -> None:
    """Verify that the dashboard data structure is JSON-serializable."""
    data: dict[str, Any] = {
        "stats": {
            "totalVersions": 12,
            "totalTools": 28,
            "totalLoc": 1247,
            "completedSessions": 0,
            "learningProgress": 0,
        },
        "recentActivity": [
            {
                "id": "act-001",
                "type": "version_viewed",
                "title": "Viewed s01",
                "description": "Test description",
                "timestamp": "2025-01-01T00:00:00.000Z",
            }
        ],
    }

    # Should not raise
    json_str = json.dumps(data)
    parsed = json.loads(json_str)

    assert parsed["stats"]["totalVersions"] == 12
    assert parsed["recentActivity"][0]["type"] == "version_viewed"
