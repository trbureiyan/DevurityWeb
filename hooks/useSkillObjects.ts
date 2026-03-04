"use client";

import { useState, useEffect } from "react";

interface Skill {
  id: number;
  name: string;
}

export function useSkillObjects(): Skill[] {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function fetchSkills() {
      try {
        const response = await fetch("/api/auth/skills");
        const data = await response.json();
        if (response.ok && !cancelled) {
          const normalizedSkills: Skill[] = (data.skills || []).map(
            (skill: { id: number; name: string }) => ({
              id: skill.id,
              name: skill.name,
            }),
          );
          setSkills(normalizedSkills);
        }
      } catch {
        // Error fetching skills - silent fail
      }
    }

    fetchSkills();

    return () => {
      cancelled = true;
    };
  }, []);

  return skills;
}
