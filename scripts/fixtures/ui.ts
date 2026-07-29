/**
 * scripts/fixtures/ui.ts — Terminal rendering primitives for the fixture CLI.
 *
 * Uses ANSI 16-color palette only so the output respects the user's terminal
 * theme (Catppuccin, Gruvbox, etc.) without contrast collisions.
 *
 * Box-drawing via Unicode characters — no external dependencies.
 */

// ─────────────────────────────────────────────────────────────
// ANSI 16-color palette (logical names, not raw hex)
// ─────────────────────────────────────────────────────────────
export const C = {
  reset:  "\x1b[0m",
  bold:   "\x1b[1m",
  dim:    "\x1b[2m",
  red:    "\x1b[31m",
  green:  "\x1b[32m",
  yellow: "\x1b[33m",
  blue:   "\x1b[34m",
  cyan:   "\x1b[36m",
  white:  "\x1b[97m",
  gray:   "\x1b[90m",
} as const;

/** Strip ANSI escape sequences to compute the visual character width of a string. */
export function vlen(str: string): number {
  return str.replace(/\x1b\[[0-9;]*m/g, "").length;
}

/** Pad a string to a target visual width (accounts for ANSI sequences). */
function padEnd(str: string, width: number): string {
  const pad = Math.max(0, width - vlen(str));
  return str + " ".repeat(pad);
}

// ─────────────────────────────────────────────────────────────
// Box-drawing renderer
// ─────────────────────────────────────────────────────────────

/** Render a Unicode-bordered box to stdout, with an optional title. */
export function renderBox(lines: string[], title?: string): void {
  const MIN_INNER = 44;
  const innerWidth = Math.max(
    MIN_INNER,
    ...lines.map((l) => vlen(l)),
    title ? vlen(title) + 2 : 0
  );

  const hr = "─".repeat(innerWidth + 2);
  const top = title
    ? `┌─ ${C.bold}${title}${C.reset} ${"─".repeat(Math.max(0, innerWidth - vlen(title) - 1))}┐`
    : `┌${hr}┐`;

  process.stdout.write(top + "\n");
  for (const line of lines) {
    process.stdout.write("│ " + padEnd(line, innerWidth) + " │\n");
  }
  process.stdout.write("└" + hr + "┘\n");
}

// ─────────────────────────────────────────────────────────────
// Shared result type — returned by all fixture seed/reset calls
// ─────────────────────────────────────────────────────────────
export interface SeedResult {
  created: number;
  skipped: number;
}

// ─────────────────────────────────────────────────────────────
// Composite result box
// ─────────────────────────────────────────────────────────────

/**
 * Render a post-operation summary box listing outcomes per table.
 * Uses ✔ / ─ icons — never relies on color alone to signal state.
 */
export function renderResultBox(results: Record<string, SeedResult>): void {
  const lines = Object.entries(results).map(([table, { created, skipped }]) => {
    const icon   = created > 0 ? `${C.green}✔${C.reset}` : `${C.yellow}─${C.reset}`;
    const label  = `${C.white}${C.bold}${table}${C.reset}`;
    const counts = `${C.green}${created} creados${C.reset}` +
                   (skipped > 0 ? `${C.gray}, ${skipped} omitidos${C.reset}` : "");
    return `${icon}  ${padEnd(label, 20)}  ${counts}`;
  });

  console.log("");
  renderBox(lines, "Resultado");
}

// ─────────────────────────────────────────────────────────────
// Status table
// ─────────────────────────────────────────────────────────────

export function renderStatusBox(rows: Array<{ label: string; value: string }>): void {
  const lines = rows.map(({ label, value }) => {
    return `${C.gray}${padEnd(label, 20)}${C.reset}  ${C.cyan}${value}${C.reset}`;
  });
  renderBox(lines, "Estado actual");
}

// ─────────────────────────────────────────────────────────────
// Error panel — wraps errors in a high-contrast bordered box
// ─────────────────────────────────────────────────────────────
export function renderError(message: string, detail?: string): void {
  const lines = [
    `${C.red}✘  ${message}${C.reset}`,
    ...(detail ? [`${C.gray}   ${detail}${C.reset}`] : []),
  ];
  console.log("");
  renderBox(lines, "Error");
}
