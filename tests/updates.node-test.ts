import { test } from "node:test";
import { strictEqual, ok } from "node:assert/strict";
import { NextRequest } from "next/server";

// 1. Mock global prisma before importing the routes
const mockPrisma = {
  updates: {
    count: async ({ where }: { where: Record<string, unknown> }) => {
      if (where.slug === "existing-slug") {
        return 1;
      }
      return 0;
    },
    create: async ({ data }: { data: Record<string, unknown> }) => {
      return {
        id: 99n,
        slug: data.slug as string,
        title: data.title as string,
        description: data.description as string,
        display_date: data.display_date as string,
        published_at: (data.published_at as Date) || new Date("2026-07-30T12:00:00.000Z"),
        tags: data.tags as string[],
        border_color: data.border_color as string,
        href: (data.href as string | null) ?? null,
        is_featured: (data.is_featured as boolean) || false,
        status: (data.status as string) || "published",
        created_at: new Date("2026-07-30T12:00:00.000Z"),
        updated_at: new Date("2026-07-30T12:00:00.000Z"),
      };
    },
    findUnique: async ({ where }: { where: Record<string, unknown> }) => {
      if (where.id === 99n) {
        return {
          id: 99n,
          slug: "test-update",
          title: "Test Update",
          description: "Test description",
          display_date: "13 de agosto 2025",
          published_at: new Date("2026-07-30T12:00:00.000Z"),
          tags: ["test"],
          border_color: "#b20403",
          href: null,
          is_featured: false,
          status: "published",
          created_at: new Date("2026-07-30T12:00:00.000Z"),
          updated_at: new Date("2026-07-30T12:00:00.000Z"),
        };
      }
      return null;
    },
    findMany: async () => [
      {
        id: 99n,
        slug: "test-update",
        title: "Test Update",
        description: "Test description",
        display_date: "13 de agosto 2025",
        published_at: new Date("2026-07-30T12:00:00.000Z"),
        tags: ["test"],
        border_color: "#b20403",
        href: null,
        is_featured: false,
        status: "published",
        created_at: new Date("2026-07-30T12:00:00.000Z"),
        updated_at: new Date("2026-07-30T12:00:00.000Z"),
      },
    ],
    update: async ({ where, data }: { where: Record<string, unknown>; data: Record<string, unknown> }) => {
      return {
        id: where.id as bigint,
        slug: "test-update",
        title: data.title !== undefined ? data.title : "Test Update",
        description: data.description !== undefined ? data.description : "Test description",
        display_date: data.display_date !== undefined ? data.display_date : "13 de agosto 2025",
        published_at: new Date("2026-07-30T12:00:00.000Z"),
        tags: data.tags !== undefined ? data.tags : ["test"],
        border_color: data.border_color !== undefined ? data.border_color : "#b20403",
        href: data.href !== undefined ? data.href : null,
        is_featured: data.is_featured !== undefined ? data.is_featured : false,
        status: data.status !== undefined ? data.status : "published",
        created_at: new Date("2026-07-30T12:00:00.000Z"),
        updated_at: new Date("2026-07-30T12:00:00.000Z"),
      };
    },
    delete: async ({ where }: { where: Record<string, unknown> }) => {
      return {
        id: where.id as bigint,
      };
    },
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).prisma = mockPrisma;
process.env.JWT_SECRET = "supersecretkeyfortestingpurposesonly";

test("Updates API Route - GET /api/updates returns a fresh management list", async () => {
  const { GET } = await import("../app/api/updates/route");
  const { generateToken } = await import("../lib/jwt");
  const token = await generateToken({ sub: "1", role: "admin" });
  const req = new NextRequest("http://localhost/api/updates?management=1", {
    headers: { cookie: `auth_token=${token}` },
  });

  const res = await GET(req);
  strictEqual(res.status, 200);

  const data = await res.json();
  strictEqual(data.success, true);
  strictEqual(data.data[0].id, "99");
  strictEqual(res.headers.get("cache-control"), "no-store");

  const invalidSession = await GET(new NextRequest("http://localhost/api/updates?management=1", {
    headers: { cookie: "auth_token=invalid" },
  }));
  strictEqual(invalidSession.status, 401);

  const userToken = await generateToken({ sub: "2", role: "user" });
  const restricted = await GET(new NextRequest("http://localhost/api/updates?management=1", {
    headers: { cookie: `auth_token=${userToken}` },
  }));
  strictEqual(restricted.status, 403);
});

test("Updates API Route - POST /api/updates", async (t) => {
  const { POST } = await import("../app/api/updates/route");
  const { generateToken } = await import("../lib/jwt");

  await t.test("Fails when unauthenticated (no cookies)", async () => {
    const req = new NextRequest("http://localhost/api/updates", {
      method: "POST",
      body: JSON.stringify({ title: "New title" }),
    });

    const res = await POST(req);
    strictEqual(res.status, 401);
    const data = await res.json();
    strictEqual(data.success, false);
    strictEqual(data.error, "No autenticado");
  });

  await t.test("Fails when authenticated as a regular user (role mismatch)", async () => {
    const token = await generateToken({ sub: "2", role: "user" });
    const req = new NextRequest("http://localhost/api/updates", {
      method: "POST",
      headers: {
        cookie: `auth_token=${token}`,
      },
      body: JSON.stringify({ title: "New title" }),
    });

    const res = await POST(req);
    strictEqual(res.status, 403);
    const data = await res.json();
    strictEqual(data.success, false);
    strictEqual(data.error, "Acceso restringido");
  });

  await t.test("Fails when required fields are missing", async () => {
    const token = await generateToken({ sub: "1", role: "content_manager" });
    const req = new NextRequest("http://localhost/api/updates", {
      method: "POST",
      headers: {
        cookie: `auth_token=${token}`,
      },
      body: JSON.stringify({ title: "New title" }), // description, displayDate, tags are missing
    });

    const res = await POST(req);
    strictEqual(res.status, 400);
    const data = await res.json();
    strictEqual(data.success, false);
    strictEqual(data.error, "La descripción es requerida");
  });

  await t.test("Succeeds when authenticated as content_manager with valid payload", async () => {
    const token = await generateToken({ sub: "1", role: "content_manager" });
    const payload = {
      title: "Prueba de Actualización Increíble!",
      excerpt: "Esta es la descripción detallada de la prueba.",
      displayDate: "30 de julio 2026",
      tags: ["pruebas", "api"],
      href: "https://example.com/external",
      borderColor: "#ca2b26",
    };

    const req = new NextRequest("http://localhost/api/updates", {
      method: "POST",
      headers: {
        cookie: `auth_token=${token}`,
      },
      body: JSON.stringify(payload),
    });

    const res = await POST(req);
    strictEqual(res.status, 201);
    
    const body = await res.json();
    strictEqual(body.success, true);
    
    const item = body.data;
    strictEqual(item.id, "99");
    strictEqual(item.title, payload.title);
    strictEqual(item.excerpt, payload.excerpt);
    strictEqual(item.displayDate, payload.displayDate);
    strictEqual(item.slug, "prueba-de-actualizacion-increible");
    strictEqual(item.href, payload.href);
    strictEqual(item.borderColor, payload.borderColor);
    ok(Array.isArray(item.tags));
    strictEqual(item.tags[0], "pruebas");
  });
});

test("Updates API Route - PUT /api/updates/[id]", async (t) => {
  const { PUT } = await import("../app/api/updates/[id]/route");
  const { generateToken } = await import("../lib/jwt");

  await t.test("Fails when unauthenticated (no cookies)", async () => {
    const req = new NextRequest("http://localhost/api/updates/99", {
      method: "PUT",
      body: JSON.stringify({ title: "Updated Title" }),
    });

    const res = await PUT(req, { params: Promise.resolve({ id: "99" }) });
    strictEqual(res.status, 401);
  });

  await t.test("Fails when update does not exist", async () => {
    const token = await generateToken({ sub: "1", role: "admin" });
    const req = new NextRequest("http://localhost/api/updates/100", {
      method: "PUT",
      headers: {
        cookie: `auth_token=${token}`,
      },
      body: JSON.stringify({ title: "Updated Title" }),
    });

    const res = await PUT(req, { params: Promise.resolve({ id: "100" }) });
    strictEqual(res.status, 404);
    const data = await res.json();
    strictEqual(data.success, false);
    strictEqual(data.error, "Actualización no encontrada");
  });

  await t.test("Succeeds updating update when authenticated as admin", async () => {
    const token = await generateToken({ sub: "1", role: "admin" });
    const payload = {
      title: "Updated Title",
      excerpt: "Updated description text.",
    };

    const req = new NextRequest("http://localhost/api/updates/99", {
      method: "PUT",
      headers: {
        cookie: `auth_token=${token}`,
      },
      body: JSON.stringify(payload),
    });

    const res = await PUT(req, { params: Promise.resolve({ id: "99" }) });
    strictEqual(res.status, 200);

    const body = await res.json();
    strictEqual(body.success, true);
    strictEqual(body.data.title, "Updated Title");
    strictEqual(body.data.excerpt, "Updated description text.");
  });

  await t.test("Rejects explicitly empty title and description", async () => {
    const token = await generateToken({ sub: "1", role: "admin" });
    const req = new NextRequest("http://localhost/api/updates/99", {
      method: "PUT",
      headers: {
        cookie: `auth_token=${token}`,
      },
      body: JSON.stringify({ title: "   " }),
    });

    const res = await PUT(req, { params: Promise.resolve({ id: "99" }) });
    strictEqual(res.status, 400);
  });
});

test("Updates API Route - DELETE /api/updates/[id]", async (t) => {
  const { DELETE } = await import("../app/api/updates/[id]/route");
  const { generateToken } = await import("../lib/jwt");

  await t.test("Fails when unauthenticated (no cookies)", async () => {
    const req = new NextRequest("http://localhost/api/updates/99", {
      method: "DELETE",
    });

    const res = await DELETE(req, { params: Promise.resolve({ id: "99" }) });
    strictEqual(res.status, 401);
  });

  await t.test("Fails when update does not exist", async () => {
    const token = await generateToken({ sub: "1", role: "admin" });
    const req = new NextRequest("http://localhost/api/updates/100", {
      method: "DELETE",
      headers: {
        cookie: `auth_token=${token}`,
      },
    });

    const res = await DELETE(req, { params: Promise.resolve({ id: "100" }) });
    strictEqual(res.status, 404);
  });

  await t.test("Succeeds deleting update when authenticated as admin", async () => {
    const token = await generateToken({ sub: "1", role: "admin" });
    const req = new NextRequest("http://localhost/api/updates/99", {
      method: "DELETE",
      headers: {
        cookie: `auth_token=${token}`,
      },
    });

    const res = await DELETE(req, { params: Promise.resolve({ id: "99" }) });
    strictEqual(res.status, 200);
    const body = await res.json();
    strictEqual(body.success, true);
    strictEqual(body.message, "Actualización archivada correctamente");
  });
});
