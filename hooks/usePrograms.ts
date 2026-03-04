"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook to fetch available academic programs from the API.
 * Loads once on mount and caches in state.
 */
export function usePrograms(): string[] {
  const [programs, setPrograms] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;

    const fetchPrograms = async () => {
      try {
        const response = await fetch("/api/auth/programs");
        const data = await response.json();
        if (response.ok && !cancelled) {
          setPrograms(data.programs || []);
        }
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    fetchPrograms();

    return () => {
      cancelled = true;
    };
  }, []);

  return programs;
}
