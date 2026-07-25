/**
 * Tests for lib/csrf.ts
 *
 * CSRF protection is the gatekeeper for every state-mutating request
 * (POST, PUT, DELETE, PATCH). A silent failure here — a token accepted when
 * it should not be, or vice-versa — would either lock out legitimate users
 * or open a cross-site forgery vector. These tests validate:
 *
 *   1. Token generation: correct length, correct charset.
 *   2. Equality correctness: identical tokens pass, any divergence fails.
 *      (Note: The constant-time property is not validated in CI as timing
 *      measurements are fragile and prone to false positives in virtualized
 *      environments. We test for logical correctness.)
 *   3. Edge cases: empty inputs, null-like values, different lengths.
 *   4. Method detection: which HTTP verbs trigger CSRF enforcement.
 *   5. String formatting: Cookie creation and header/form extraction.
 */
import { test } from "node:test";
import { ok, strictEqual } from "node:assert/strict";
import { csrfAdapter } from "../lib/csrf";

// ---------------------------------------------------------------------------
// Token generation
// ---------------------------------------------------------------------------

test("csrfAdapter.generateToken — produces a well-formed token", async (t) => {
  await t.test("returns a string of exactly 32 characters", () => {
    const token = csrfAdapter.generateToken();
    strictEqual(typeof token, "string");
    strictEqual(token.length, 32);
  });

  await t.test("contains only alphanumeric characters", () => {
    const token = csrfAdapter.generateToken();
    ok(/^[A-Za-z0-9]+$/.test(token), `Token "${token}" contains unexpected characters`);
  });

  await t.test("two consecutive calls produce different tokens", () => {
    const a = csrfAdapter.generateToken();
    const b = csrfAdapter.generateToken();
    // Probability of collision is astronomically low for 32-char random tokens.
    ok(a !== b, "generateToken returned the same value twice — source is not random");
  });
});

// ---------------------------------------------------------------------------
// Token validation — constant-time equality
// ---------------------------------------------------------------------------

test("csrfAdapter.validateToken — identical tokens pass", async (t) => {
  await t.test("same token value returns true", () => {
    const token = csrfAdapter.generateToken();
    ok(csrfAdapter.validateToken(token, token));
  });

  await t.test("two independently generated identical strings pass", () => {
    const value = "AAAABBBBCCCCDDDDEEEEFFFFGGGGHHHH"; // 32 chars
    ok(csrfAdapter.validateToken(value, value));
  });
});

test("csrfAdapter.validateToken — divergent tokens fail", async (t) => {
  await t.test("single character difference in the middle fails", () => {
    const base   = "AAAABBBBCCCCDDDDEEEEFFFFGGGGXXXX";
    const tampered = "AAAABBBBCCCCDDDDEEEEFFFFGGGGXXX0";
    strictEqual(csrfAdapter.validateToken(base, tampered), false);
  });

  await t.test("single character difference at position 0 fails", () => {
    const a = "XAAABBBBCCCCDDDDEEEEFFFFGGGGXXXX";
    const b = "AAAABBBBCCCCDDDDEEEEFFFFGGGGXXXX";
    strictEqual(csrfAdapter.validateToken(a, b), false);
  });

  await t.test("entirely different tokens of same length fail", () => {
    const a = csrfAdapter.generateToken();
    const b = csrfAdapter.generateToken();
    
    // First, assert the generator isn't completely broken and returning
    // the same value repeatedly.
    ok(a !== b, "Generated tokens should be unique");
    
    // Then test the validation fails.
    strictEqual(csrfAdapter.validateToken(a, b), false);
  });
});

test("csrfAdapter.validateToken — edge cases", async (t) => {
  await t.test("empty string for both arguments fails", () => {
    // The implementation guards on !token || !expectedToken before comparison.
    strictEqual(csrfAdapter.validateToken("", ""), false);
  });

  await t.test("empty header token against valid cookie fails", () => {
    const cookie = csrfAdapter.generateToken();
    strictEqual(csrfAdapter.validateToken("", cookie), false);
  });

  await t.test("valid header against empty cookie fails", () => {
    const header = csrfAdapter.generateToken();
    strictEqual(csrfAdapter.validateToken(header, ""), false);
  });

  await t.test("tokens of different lengths fail — no padding or truncation", () => {
    const short = "AAAA";
    const long  = "AAAABBBBCCCCDDDDEEEEFFFFGGGGXXXX";
    strictEqual(csrfAdapter.validateToken(short, long), false);
  });
});

// ---------------------------------------------------------------------------
// Method detection — which verbs require CSRF enforcement
// ---------------------------------------------------------------------------

test("csrfAdapter.requiresCsrfProtection — identifies mutable verbs", async (t) => {
  const mutating = ["POST", "PUT", "DELETE", "PATCH"];
  const safe     = ["GET", "HEAD", "OPTIONS"];

  for (const method of mutating) {
    await t.test(`${method} requires CSRF protection`, () => {
      ok(csrfAdapter.requiresCsrfProtection(method));
    });

    await t.test(`lowercase ${method.toLowerCase()} also requires CSRF protection`, () => {
      ok(csrfAdapter.requiresCsrfProtection(method.toLowerCase()));
    });
  }

  for (const method of safe) {
    await t.test(`${method} does NOT require CSRF protection`, () => {
      strictEqual(csrfAdapter.requiresCsrfProtection(method), false);
    });
  }
});

// ---------------------------------------------------------------------------
// String Formatting and Extraction
// ---------------------------------------------------------------------------

test("csrfAdapter helpers — formats and extracts tokens correctly", async (t) => {
  await t.test("createCookie generates a valid HttpOnly cookie string", () => {
    const token = "AAAABBBBCCCCDDDDEEEEFFFFGGGGHHHH";
    const cookieString = csrfAdapter.createCookie(token);
    
    ok(cookieString.includes(`csrf_token=${token}`));
    ok(cookieString.includes("HttpOnly"));
    ok(cookieString.includes("Path=/"));
    ok(cookieString.includes("SameSite=Strict"));
    ok(cookieString.includes("Max-Age=86400"));
  });

  await t.test("extractTokenFromHeaders reads the x-csrf-token header", () => {
    const req = new Request("http://localhost", {
      headers: { "x-csrf-token": "my-header-token" }
    });
    strictEqual(csrfAdapter.extractTokenFromHeaders(req), "my-header-token");
  });

  await t.test("extractTokenFromHeaders returns null if header is missing", () => {
    const req = new Request("http://localhost");
    strictEqual(csrfAdapter.extractTokenFromHeaders(req), null);
  });

  await t.test("extractTokenFromForm reads the csrf_token field", () => {
    const formData = new FormData();
    formData.append("csrf_token", "my-form-token");
    strictEqual(csrfAdapter.extractTokenFromForm(formData), "my-form-token");
  });

  await t.test("extractTokenFromForm returns null if field is missing", () => {
    const formData = new FormData();
    strictEqual(csrfAdapter.extractTokenFromForm(formData), null);
  });
});

