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
// emailUniversity — any valid local part at the exact @usco.edu.co domain
// ---------------------------------------------------------------------------

test("emailUniversity — accepts valid institutional addresses", async (t) => {
  await t.test("student 11-digit code", () => {
    ok(emailUniversity("u20231234567@usco.edu.co"));
  });

  await t.test("professor address", () => {
    ok(emailUniversity("profesor.apellido@usco.edu.co"));
  });

  await t.test("administrator address", () => {
    ok(emailUniversity("administrador+semillero@usco.edu.co"));
  });
});

test("emailUniversity — rejects non-institutional addresses", async (t) => {
  await t.test("missing local part", () => {
    strictEqual(emailUniversity("@usco.edu.co"), false);
  });

  await t.test("invalid whitespace", () => {
    strictEqual(emailUniversity("profesor apellido@usco.edu.co"), false);
  });

  await t.test("wrong domain", () => {
    strictEqual(emailUniversity("profesor.apellido@gmail.com"), false);
  });

  await t.test("subdomain on usco", () => {
    strictEqual(emailUniversity("profesor.apellido@mail.usco.edu.co"), false);
  });

  await t.test("empty string", () => {
    strictEqual(emailUniversity(""), false);
  });

  await t.test("trailing whitespace", () => {
    strictEqual(emailUniversity("profesor@usco.edu.co "), false);
  });

  await t.test("uppercase domain is not normalized by the helper", () => {
    strictEqual(emailUniversity("profesor@USCO.EDU.CO"), false);
  });

  await t.test("leading dot in local part", () => {
    strictEqual(emailUniversity(".profesor@usco.edu.co"), false);
  });

  await t.test("trailing dot in local part", () => {
    strictEqual(emailUniversity("profesor.@usco.edu.co"), false);
  });

  await t.test("consecutive dots in local part", () => {
    strictEqual(emailUniversity("pro..fesor@usco.edu.co"), false);
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
    // Uppercase + lowercase + digit + special, exactly 8 chars
    ok(isValidPassword("Zzz#0aaa"));
  });

  await t.test("long password with all character classes", () => {
    ok(isValidPassword("Xxxxxx99!yyyyyy"));
  });

  await t.test("exactly 8 characters, all classes present", () => {
    ok(isValidPassword("Aa1!Bb2@"));
  });

  await t.test("special characters from the allowed set", () => {
    ok(isValidPassword("Qqqq0@qq"));
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
