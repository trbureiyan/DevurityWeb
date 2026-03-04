"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook to fetch available skills from the API.
 * Loads once on mount and caches in state.
 */
export function useAvailableSkills(): string[] {
  const [skills, setSkills] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;

    const fetchSkills = async () => {
      try {
        const response = await fetch("/api/auth/skills");
        const data = await response.json();
        if (response.ok && !cancelled) {
          setSkills(data.skills || []);
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();

    return () => {
      cancelled = true;
    };
  }, []);

  return skills;
}
