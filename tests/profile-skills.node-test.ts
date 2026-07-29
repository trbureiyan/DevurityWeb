import { deepEqual } from "node:assert/strict";
import test from "node:test";
import { skillNamesFromOptions } from "../lib/profile/skills";

test("normalizes API skill options to names for the profile editor", () => {
  deepEqual(
    skillNamesFromOptions([
      { id: 1, name: "TypeScript" },
      { id: 2, name: "React" },
    ]),
    ["TypeScript", "React"],
  );
});

test("removes duplicate skill names before rendering or saving", () => {
  deepEqual(
    skillNamesFromOptions([
      { id: 1, name: "React" },
      { id: 2, name: "React" },
      "TypeScript",
    ]),
    ["React", "TypeScript"],
  );
});
