import { test } from "node:test";
import { strictEqual, ok } from "node:assert/strict";
import { NextRequest } from "next/server";

// 1. Mock global prisma before importing the routes
const mockPrisma = {
  users: {
    findUnique: async ({ where }: { where: Record<string, unknown> }) => {
      // Allow searching by id or username
      if (where.id === 1n || where.username === "testuser") {
        return {
          id: 1n,
          name: "Test User",
          email: "testuser@usco.edu.co",
          roles: { name: "admin" }
        };
      }
      if (where.id === 2n) {
        return {
          id: 2n,
          name: "Regular User",
          email: "regular@usco.edu.co",
          roles: { name: "user" }
        };
      }
      return null;
    }
  },
  attendances: {
    findMany: async () => {
      return [
        {
          id: 1n,
          user_id: 1n,
          attendance_date: new Date("2026-06-27T12:00:00.000Z"),
          users: { id: 1n, name: "Test User", email: "testuser@usco.edu.co" }
        }
      ];
    },
    findFirst: async () => {
      return null; // Simulate no previous attendance today
    },
    create: async ({ data }: { data: { user_id: bigint, attendance_date: Date } }) => {
      return {
        id: 99n,
        user_id: data.user_id,
        attendance_date: data.attendance_date,
        users: { id: data.user_id, name: "Test User", email: "testuser@usco.edu.co" }
      };
    }
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).prisma = mockPrisma;

// Mock process.env for tests
process.env.JWT_SECRET = "supersecretkeyfortestingpurposesonly";

test("QR Dynamic Route - Token Validation and UUID check", async (t) => {
  // Use dynamic imports to prevent ES module hoisting from initializing Prisma too early
  const { POST: generateQrHandler } = await import("../app/api/qr-dinamico/route");
  const { generateToken } = await import("../lib/jwt");
  const adminToken = await generateToken({ sub: "1", role: "admin" });
  const authHeaders = { cookie: `auth_token=${adminToken}` };

  await t.test("Rejects QR generation without authentication", async () => {
    const req = new NextRequest("http://localhost/api/qr-dinamico", {
      method: "POST",
      body: JSON.stringify({ userId: "1" }),
    });

    const res = await generateQrHandler(req);
    strictEqual(res.status, 401);
  });

  await t.test("Generates QR successfully with a secure UUID token", async () => {
    const req = new NextRequest("http://localhost/api/qr-dinamico", {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({ userId: "1" }),
    });

    const res = await generateQrHandler(req);
    strictEqual(res.status, 200);

    const data = await res.json();
    ok(data.qr.startsWith("data:image/png;base64,"));
    strictEqual(data.userId, "1");
    strictEqual(data.usuario.nombre, "Test User");

    ok(data.expiresAt > Date.now());
  });

  await t.test("Fails when userId is missing", async () => {
    const req = new NextRequest("http://localhost/api/qr-dinamico", {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({}),
    });

    const res = await generateQrHandler(req);
    strictEqual(res.status, 400);
    const data = await res.json() as { error: string };
    strictEqual(data.error, "ID de usuario requerido");
  });

  await t.test("Fails when user does not exist", async () => {
    const req = new NextRequest("http://localhost/api/qr-dinamico", {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({ userId: "999" }),
    });

    const res = await generateQrHandler(req);
    strictEqual(res.status, 404);
    const data = await res.json() as { error: string };
    strictEqual(data.error, "Usuario no encontrado");
  });
});

test("Attendance GET Route - Authentication and Authorization security", async (t) => {
  const { GET: getAttendancesHandler } = await import("../app/api/asistencia/route");
  const { generateToken } = await import("../lib/jwt");

  await t.test("Fails when unauthenticated (no cookies)", async () => {
    const req = new NextRequest("http://localhost/api/asistencia", {
      method: "GET",
    });

    const res = await getAttendancesHandler(req);
    strictEqual(res.status, 401);
    const data = await res.json();
    strictEqual(data.error, "No autenticado");
  });

  await t.test("Fails when token is invalid", async () => {
    const req = new NextRequest("http://localhost/api/asistencia", {
      method: "GET",
      headers: {
        cookie: "auth_token=invalidtokenhere",
      },
    });

    const res = await getAttendancesHandler(req);
    strictEqual(res.status, 401);
    const data = await res.json();
    strictEqual(data.error, "Token inválido");
  });

  await t.test("Fails when authenticated but not an admin", async () => {
    const token = await generateToken({ sub: "2", role: "user" });

    const req = new NextRequest("http://localhost/api/asistencia", {
      method: "GET",
      headers: {
        cookie: `auth_token=${token}`,
      },
    });

    const res = await getAttendancesHandler(req);
    strictEqual(res.status, 403);
    const data = await res.json();
    strictEqual(data.error, "Acceso denegado");
  });

  await t.test("Succeeds when authenticated as an admin", async () => {
    const token = await generateToken({ sub: "1", role: "admin" });

    const req = new NextRequest("http://localhost/api/asistencia", {
      method: "GET",
      headers: {
        cookie: `auth_token=${token}`,
      },
    });

    const res = await getAttendancesHandler(req);
    strictEqual(res.status, 200);
    const data = await res.json();
    
    strictEqual(data.length, 1);
    strictEqual(data[0].users.name, "Test User");
    strictEqual(data[0].users.email, "testuser@usco.edu.co");
  });
});

test("Attendance POST Route - Cryptographic Signature, Expiration, and CSRF checks", async (t) => {
  const { POST: postAttendanceHandler } = await import("../app/api/asistencia/route");
  const crypto = await import("crypto");
  const { generateToken } = await import("../lib/jwt");
  const secret = process.env.JWT_SECRET || "supersecretkeyfortestingpurposesonly";
  const csrfToken = "test-csrf-token-32-chars-long-abc";
  const adminToken = await generateToken({ sub: "1", role: "admin" });
  const authCookie = `csrf_token=${csrfToken}; auth_token=${adminToken}`;

  await t.test("Fails when authenticated user is not an admin", async () => {
    const userToken = await generateToken({ sub: "2", role: "user" });
    const req = new NextRequest("http://localhost/api/asistencia", {
      method: "POST",
      headers: {
        "x-csrf-token": csrfToken,
        cookie: `csrf_token=${csrfToken}; auth_token=${userToken}`,
      },
      body: JSON.stringify({ qrData: {} }),
    });

    const res = await postAttendanceHandler(req);
    strictEqual(res.status, 403);
  });

  await t.test("Fails when CSRF tokens are missing", async () => {
    const req = new NextRequest("http://localhost/api/asistencia", {
      method: "POST",
      body: JSON.stringify({
        qrData: {
          userId: "1",
          timestamp: Date.now(),
          token: "some-token",
          expiresAt: Date.now() + 60000,
          signature: "some-sig",
        },
      }),
    });

    const res = await postAttendanceHandler(req);
    strictEqual(res.status, 403);
    const data = await res.json();
    strictEqual(data.error, "Token CSRF requerido");
  });

  await t.test("Fails when CSRF tokens mismatch", async () => {
    const req = new NextRequest("http://localhost/api/asistencia", {
      method: "POST",
      headers: {
        "x-csrf-token": csrfToken,
        cookie: "csrf_token=different-token-value-here-12345",
      },
      body: JSON.stringify({
        qrData: {
          userId: "1",
          timestamp: Date.now(),
          token: "some-token",
          expiresAt: Date.now() + 60000,
          signature: "some-sig",
        },
      }),
    });

    const res = await postAttendanceHandler(req);
    strictEqual(res.status, 403);
    const data = await res.json();
    strictEqual(data.error, "Token CSRF inválido");
  });

  await t.test("Succeeds when QR is valid and correctly signed with valid CSRF", async () => {
    const timestamp = Date.now();
    const expiresAt = timestamp + 120 * 1000;
    const token = "some-secure-uuid";
    const userId = "1";

    const signature = crypto.default
      .createHmac("sha256", secret)
      .update(`${userId}:${timestamp}:${token}:${expiresAt}`)
      .digest("hex");

    const req = new NextRequest("http://localhost/api/asistencia", {
      method: "POST",
      headers: {
        "x-csrf-token": csrfToken,
        cookie: authCookie,
      },
      body: JSON.stringify({
        qrData: {
          userId,
          timestamp,
          token,
          expiresAt,
          signature,
        },
      }),
    });

    const res = await postAttendanceHandler(req);
    strictEqual(res.status, 200);
    const data = await res.json();
    strictEqual(data.message, "Asistencia registrada exitosamente");
    strictEqual(data.usuario.nombre, "Test User");
  });

  await t.test("Fails when signature is missing but CSRF is valid", async () => {
    const timestamp = Date.now();
    const expiresAt = timestamp + 120 * 1000;
    const token = "some-secure-uuid";
    const userId = "1";

    const req = new NextRequest("http://localhost/api/asistencia", {
      method: "POST",
      headers: {
        "x-csrf-token": csrfToken,
        cookie: authCookie,
      },
      body: JSON.stringify({
        qrData: {
          userId,
          timestamp,
          token,
          expiresAt,
        },
      }),
    });

    const res = await postAttendanceHandler(req);
    strictEqual(res.status, 400);
    const data = await res.json();
    ok(data.error.includes("firma de seguridad"));
  });

  await t.test("Fails when signature is invalid/forged but CSRF is valid", async () => {
    const timestamp = Date.now();
    const expiresAt = timestamp + 120 * 1000;
    const token = "some-secure-uuid";
    const userId = "1";

    const req = new NextRequest("http://localhost/api/asistencia", {
      method: "POST",
      headers: {
        "x-csrf-token": csrfToken,
        cookie: authCookie,
      },
      body: JSON.stringify({
        qrData: {
          userId,
          timestamp,
          token,
          expiresAt,
          signature: "wrongsignaturehere",
        },
      }),
    });

    const res = await postAttendanceHandler(req);
    strictEqual(res.status, 400);
    const data = await res.json();
    ok(data.error.includes("firma corrupta o no autorizada"));
  });

  await t.test("Fails when QR code is expired but CSRF is valid", async () => {
    const timestamp = Date.now() - 300 * 1000; // 5 mins ago
    const expiresAt = timestamp + 120 * 1000; // expired 3 mins ago
    const token = "some-secure-uuid";
    const userId = "1";

    const signature = crypto.default
      .createHmac("sha256", secret)
      .update(`${userId}:${timestamp}:${token}:${expiresAt}`)
      .digest("hex");

    const req = new NextRequest("http://localhost/api/asistencia", {
      method: "POST",
      headers: {
        "x-csrf-token": csrfToken,
        cookie: authCookie,
      },
      body: JSON.stringify({
        qrData: {
          userId,
          timestamp,
          token,
          expiresAt,
          signature,
        },
      }),
    });

    const res = await postAttendanceHandler(req);
    strictEqual(res.status, 410);
    const data = await res.json();
    ok(data.error.includes("QR expirado"));
  });
});

test("Admin attendance POST Route - Authentication, CSRF, and signature checks", async (t) => {
  const { POST: postAttendanceHandler } = await import("../app/api/admin/attendances/route");
  const { generateToken } = await import("../lib/jwt");
  const crypto = await import("crypto");
  const secret = process.env.JWT_SECRET || "supersecretkeyfortestingpurposesonly";
  const csrfToken = "test-csrf-token-32-chars-long-abc";
  const adminToken = await generateToken({ sub: "1", role: "admin" });
  const headers = {
    "x-csrf-token": csrfToken,
    cookie: `csrf_token=${csrfToken}; auth_token=${adminToken}`,
  };

  await t.test("Rejects a QR without a valid signature", async () => {
    const req = new NextRequest("http://localhost/api/admin/attendances", {
      method: "POST",
      headers,
      body: JSON.stringify({
        qrData: {
          userId: "1",
          timestamp: Date.now(),
          token: "some-token",
          expiresAt: Date.now() + 60000,
          signature: "forged",
        },
      }),
    });

    strictEqual((await postAttendanceHandler(req)).status, 400);
  });

  await t.test("Accepts a valid signed QR for an authenticated admin", async () => {
    const timestamp = Date.now();
    const expiresAt = timestamp + 120000;
    const token = "some-secure-uuid";
    const userId = "1";
    const signature = crypto.default
      .createHmac("sha256", secret)
      .update(`${userId}:${timestamp}:${token}:${expiresAt}`)
      .digest("hex");
    const req = new NextRequest("http://localhost/api/admin/attendances", {
      method: "POST",
      headers,
      body: JSON.stringify({ qrData: { userId, timestamp, token, expiresAt, signature } }),
    });

    strictEqual((await postAttendanceHandler(req)).status, 200);
  });
});
