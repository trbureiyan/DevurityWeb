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

  await t.test("Generates QR successfully with a secure UUID token", async () => {
    const req = new NextRequest("http://localhost/api/qr-dinamico", {
      method: "POST",
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
