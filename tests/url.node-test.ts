import { test } from "node:test";
import { strictEqual } from "node:assert/strict";
import { validateHref } from "../lib/utils/url";
import {
  getPublicRouteSuggestions,
  getPublicRedirect,
  normalizePublicPath,
} from "../lib/routing/public-routes";

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

test("normalizePublicPath removes only a trailing slash", () => {
  strictEqual(normalizePublicPath("/projects/"), "/projects");
  strictEqual(normalizePublicPath("/"), "/");
  strictEqual(normalizePublicPath("/Projects"), "/Projects");
});

test("getPublicRedirect returns only explicit public aliases", () => {
  strictEqual(getPublicRedirect("/login"), "/auth/login");
  strictEqual(getPublicRedirect("/auth/"), "/auth/login");
  strictEqual(getPublicRedirect("/projects"), null);
  strictEqual(getPublicRedirect("/adminn"), null);
});

test("getPublicRouteSuggestions returns close public routes without protected paths", () => {
  strictEqual(getPublicRouteSuggestions("/gallry")[0], "/gallery");
  strictEqual(getPublicRouteSuggestions("/adminn").length, 0);
  strictEqual(getPublicRouteSuggestions("/api/auth/loginn").length, 0);
});
