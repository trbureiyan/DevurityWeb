/**
 * Tests for lib/regex.ts
 *
 * These tests protect the entry-gate for new registrations. A regression in any
 * of these expressions could silently block valid institutional users or admit
 * external accounts. Tests are intentionally exhaustive on boundary cases.
 */
import { test } from "node:test";
import { ok, strictEqual } from "node:assert/strict";
import { emailUniversity, email, isValidPassword } from "../lib/regex";

// ---------------------------------------------------------------------------
// emailUniversity — institutional format: u + exactly 11 digits + @usco.edu.co
// ---------------------------------------------------------------------------

test("emailUniversity — accepts valid institutional addresses", async (t) => {
  await t.test("standard 11-digit code", () => {
    ok(emailUniversity("u20231234567@usco.edu.co"));
  });

  await t.test("digits starting with zero", () => {
    ok(emailUniversity("u00000000001@usco.edu.co"));
  });

  await t.test("all nines", () => {
    ok(emailUniversity("u99999999999@usco.edu.co"));
  });
});

test("emailUniversity — rejects non-institutional addresses", async (t) => {
  await t.test("missing leading u", () => {
    strictEqual(emailUniversity("20231234567@usco.edu.co"), false);
  });

  await t.test("only 10 digits after u", () => {
    strictEqual(emailUniversity("u2023123456@usco.edu.co"), false);
  });

  await t.test("12 digits after u", () => {
    strictEqual(emailUniversity("u202312345678@usco.edu.co"), false);
  });

  await t.test("letters mixed into the digit segment", () => {
    strictEqual(emailUniversity("u2023abc4567@usco.edu.co"), false);
  });

  await t.test("wrong domain", () => {
    strictEqual(emailUniversity("u20231234567@gmail.com"), false);
  });

  await t.test("subdomain on usco", () => {
    strictEqual(emailUniversity("u20231234567@mail.usco.edu.co"), false);
  });

  await t.test("empty string", () => {
    strictEqual(emailUniversity(""), false);
  });

  await t.test("uppercase U prefix", () => {
    // The regex anchors on lowercase u — institutional codes are always lowercase.
    strictEqual(emailUniversity("U20231234567@usco.edu.co"), false);
  });

  await t.test("trailing whitespace", () => {
    strictEqual(emailUniversity("u20231234567@usco.edu.co "), false);
  });
});

// ---------------------------------------------------------------------------
// email — general RFC-ish validation for any address
// ---------------------------------------------------------------------------

test("email — accepts well-formed addresses", async (t) => {
  await t.test("gmail address", () => {
    ok(email("usuario@gmail.com"));
  });

  await t.test("subdomain address", () => {
    ok(email("admin@mail.empresa.co"));
  });

  await t.test("plus-sign alias", () => {
    ok(email("user+filter@domain.org"));
  });

  await t.test("dot in local part", () => {
    ok(email("nombre.apellido@empresa.com"));
  });

  await t.test("institutional usco address", () => {
    ok(email("u20231234567@usco.edu.co"));
  });
});

test("email — rejects malformed addresses", async (t) => {
  await t.test("missing at-sign", () => {
    strictEqual(email("usuariodomain.com"), false);
  });

  await t.test("missing domain", () => {
    strictEqual(email("usuario@"), false);
  });

  await t.test("missing TLD", () => {
    strictEqual(email("usuario@domain"), false);
  });

  await t.test("single-char TLD", () => {
    strictEqual(email("usuario@domain.c"), false);
  });

  await t.test("empty string", () => {
    strictEqual(email(""), false);
  });

  await t.test("only at-sign", () => {
    strictEqual(email("@"), false);
  });
});

// ---------------------------------------------------------------------------
// isValidPassword — enforces complexity: upper, lower, digit, special, min 8 chars
// ---------------------------------------------------------------------------

test("isValidPassword — accepts passwords meeting all requirements", async (t) => {
  await t.test("typical strong password", () => {
    ok(isValidPassword("Secure#1"));
  });

  await t.test("long password with all character classes", () => {
    ok(isValidPassword("MyV3ryStr0ng!Pass"));
  });

  await t.test("exactly 8 characters, all classes present", () => {
    ok(isValidPassword("Aa1!Bb2@"));
  });

  await t.test("special characters from the allowed set", () => {
    ok(isValidPassword("P@ssw0rd!"));
  });
});

test("isValidPassword — rejects passwords missing required classes", async (t) => {
  await t.test("no uppercase", () => {
    strictEqual(isValidPassword("secure#1"), false);
  });

  await t.test("no lowercase", () => {
    strictEqual(isValidPassword("SECURE#1"), false);
  });

  await t.test("no digit", () => {
    strictEqual(isValidPassword("Secure##"), false);
  });

  await t.test("no special character", () => {
    strictEqual(isValidPassword("Secure11"), false);
  });

  await t.test("fewer than 8 characters", () => {
    strictEqual(isValidPassword("Sec#1"), false);
  });

  await t.test("empty string", () => {
    strictEqual(isValidPassword(""), false);
  });

  await t.test("only spaces — fails all classes", () => {
    strictEqual(isValidPassword("        "), false);
  });
});
