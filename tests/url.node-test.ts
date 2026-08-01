import { test } from "node:test";
import { strictEqual } from "node:assert/strict";
import { validateHref } from "../lib/utils/url";

test("validateHref rejects protocol-relative internal-looking URLs", () => {
  strictEqual(validateHref("//evil.example").ok, false);
  strictEqual(validateHref("/\\evil.example").ok, false);
});

test("validateHref accepts safe internal paths and http URLs", () => {
  const internalPath = validateHref("/projects");
  const hash = validateHref("#section");
  const externalUrl = validateHref("https://example.com");
  strictEqual(internalPath.ok, true);
  strictEqual(hash.ok, true);
  strictEqual(externalUrl.ok, true);
  if (internalPath.ok && hash.ok && externalUrl.ok) {
    strictEqual(internalPath.href, "/projects");
    strictEqual(hash.href, "#section");
    strictEqual(externalUrl.href, "https://example.com");
  }
});
