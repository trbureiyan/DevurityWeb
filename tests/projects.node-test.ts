import { test } from "node:test";
import { strictEqual, ok } from "node:assert/strict";
import { NextRequest } from "next/server";

// 1. Mock global prisma before importing the routes
const mockPrisma = {
  projects: {
    count: async ({ where }: { where: Record<string, unknown> }) => {
      if (where.slug === "existing-slug") {
        return 1;
      }
      return 0;
    },
    create: async ({ data }: { data: Record<string, unknown> }) => {
      return {
        id: 99n,
        slug: (data.slug as string) || "test-project",
        title: data.title as string,
        description: data.description as string,
        stage: (data.stage as string) || "incubacion",
        focus_areas: (data.focus_areas as string[]) || [],
        stack: (data.stack as string[]) || [],
        hero_image: (data.hero_image as string | null) ?? null,
        cta_label: (data.cta_label as string | null) ?? null,
        cta_href: (data.cta_href as string | null) ?? null,
        start_date: (data.start_date as Date) || new Date("2026-07-30T12:00:00.000Z"),
        is_archived: (data.is_archived as boolean) || false,
        created_at: new Date("2026-07-30T12:00:00.000Z"),
        updated_at: new Date("2026-07-30T12:00:00.000Z"),
      };
    },
    findUnique: async ({ where }: { where: Record<string, unknown> }) => {
      if (where.id === 99n || where.slug === "test-project") {
        return {
          id: 99n,
          slug: "test-project",
          title: "Test Project",
          description: "Test description",
          stage: "incubacion",
          focus_areas: ["ciberseguridad"],
          stack: ["nextjs"],
          hero_image: null,
          cta_label: "CTA",
          cta_href: "https://example.com",
          start_date: new Date("2026-07-30T12:00:00.000Z"),
          is_archived: false,
          created_at: new Date("2026-07-30T12:00:00.000Z"),
          updated_at: new Date("2026-07-30T12:00:00.000Z"),
        };
      }
      return null;
    },
    update: async ({ where, data }: { where: Record<string, unknown>; data: Record<string, unknown> }) => {
      return {
        id: where.id as bigint,
        slug: "test-project",
        title: data.title !== undefined ? data.title : "Test Project",
        description: data.description !== undefined ? data.description : "Test description",
        stage: data.stage !== undefined ? data.stage : "incubacion",
        focus_areas: data.focus_areas !== undefined ? data.focus_areas : ["ciberseguridad"],
        stack: data.stack !== undefined ? data.stack : ["nextjs"],
        hero_image: data.hero_image !== undefined ? data.hero_image : null,
        cta_label: data.cta_label !== undefined ? data.cta_label : "CTA",
        cta_href: data.cta_href !== undefined ? data.cta_href : "https://example.com",
        start_date: data.start_date !== undefined ? data.start_date : new Date("2026-07-30T12:00:00.000Z"),
        is_archived: data.is_archived !== undefined ? data.is_archived : false,
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

test("Projects API Route - POST /api/projects", async (t) => {
  const { POST } = await import("../app/api/projects/route");
  const { generateToken } = await import("../lib/jwt");

  await t.test("Fails when unauthenticated (no cookies)", async () => {
    const req = new NextRequest("http://localhost/api/projects", {
      method: "POST",
      body: JSON.stringify({ title: "New Project" }),
    });

    const res = await POST(req);
    strictEqual(res.status, 401);
    const data = await res.json();
    strictEqual(data.success, false);
    strictEqual(data.error, "No autenticado");
  });

  await t.test("Fails when authenticated with wrong role (e.g. content_manager)", async () => {
    const token = await generateToken({ sub: "2", role: "content_manager" });
    const req = new NextRequest("http://localhost/api/projects", {
      method: "POST",
      headers: {
        cookie: `auth_token=${token}`,
      },
      body: JSON.stringify({ title: "New Project" }),
    });

    const res = await POST(req);
    strictEqual(res.status, 403);
    const data = await res.json();
    strictEqual(data.success, false);
    strictEqual(data.error, "Acceso restringido");
  });

  await t.test("Fails when required fields are missing", async () => {
    const token = await generateToken({ sub: "1", role: "lead_project" });
    const req = new NextRequest("http://localhost/api/projects", {
      method: "POST",
      headers: {
        cookie: `auth_token=${token}`,
      },
      body: JSON.stringify({ title: "New Project" }), // summary, focusAreas missing
    });

    const res = await POST(req);
    strictEqual(res.status, 400);
    const data = await res.json();
    strictEqual(data.success, false);
    strictEqual(data.error, "El resumen es requerido");
  });

  await t.test("Succeeds when authenticated as lead_project with valid payload", async () => {
    const token = await generateToken({ sub: "1", role: "lead_project" });
    const payload = {
      title: "Prueba de Proyecto Fantástico",
      summary: "Este es el resumen detallado para las pruebas.",
      stage: "desarrollo",
      focusAreas: ["ciberseguridad", "devops"],
      stack: ["nextjs", "tailwind"],
      callToAction: {
        label: "Ver Repo",
        href: "https://github.com/devurity",
      },
      updatedAt: "2026-07-30T12:00:00.000Z",
    };

    const req = new NextRequest("http://localhost/api/projects", {
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
    strictEqual(item.id, "prueba-de-proyecto-fantastico");
    strictEqual(item.title, payload.title);
    strictEqual(item.summary, payload.summary);
    strictEqual(item.stage, payload.stage);
    ok(Array.isArray(item.focusAreas));
    strictEqual(item.focusAreas[0], "ciberseguridad");
    ok(Array.isArray(item.stack));
    strictEqual(item.stack[0], "nextjs");
    strictEqual(item.callToAction.label, payload.callToAction.label);
    strictEqual(item.callToAction.href, payload.callToAction.href);
  });

  await t.test("Rejects invalid stage and CTA href", async () => {
    const token = await generateToken({ sub: "1", role: "lead_project" });
    const invalidStageRequest = new NextRequest("http://localhost/api/projects", {
      method: "POST",
      headers: { cookie: `auth_token=${token}` },
      body: JSON.stringify({
        title: "Proyecto inválido",
        summary: "Resumen válido",
        stage: "desconocido",
        focusAreas: ["ciberseguridad"],
      }),
    });

    strictEqual((await POST(invalidStageRequest)).status, 400);

    const invalidHrefRequest = new NextRequest("http://localhost/api/projects", {
      method: "POST",
      headers: { cookie: `auth_token=${token}` },
      body: JSON.stringify({
        title: "Proyecto inválido",
        summary: "Resumen válido",
        stage: "desarrollo",
        focusAreas: ["ciberseguridad"],
        callToAction: { label: "Abrir", href: "javascript:alert(1)" },
      }),
    });

    strictEqual((await POST(invalidHrefRequest)).status, 400);
  });
});

test("Projects API Route - PUT /api/projects/[id]", async (t) => {
  const { PUT } = await import("../app/api/projects/[id]/route");
  const { generateToken } = await import("../lib/jwt");

  await t.test("Fails when unauthenticated (no cookies)", async () => {
    const req = new NextRequest("http://localhost/api/projects/test-project", {
      method: "PUT",
      body: JSON.stringify({ title: "Updated Title" }),
    });

    const res = await PUT(req, { params: Promise.resolve({ id: "test-project" }) });
    strictEqual(res.status, 401);
  });

  await t.test("Fails when project does not exist", async () => {
    const token = await generateToken({ sub: "1", role: "admin" });
    const req = new NextRequest("http://localhost/api/projects/non-existent-project", {
      method: "PUT",
      headers: {
        cookie: `auth_token=${token}`,
      },
      body: JSON.stringify({ title: "Updated Title" }),
    });

    const res = await PUT(req, { params: Promise.resolve({ id: "non-existent-project" }) });
    strictEqual(res.status, 404);
    const data = await res.json();
    strictEqual(data.success, false);
    strictEqual(data.error, "Proyecto no encontrado");
  });

  await t.test("Succeeds updating project when authenticated as admin", async () => {
    const token = await generateToken({ sub: "1", role: "admin" });
    const payload = {
      title: "Updated Project Title",
      summary: "Updated project description text.",
    };

    const req = new NextRequest("http://localhost/api/projects/test-project", {
      method: "PUT",
      headers: {
        cookie: `auth_token=${token}`,
      },
      body: JSON.stringify(payload),
    });

    const res = await PUT(req, { params: Promise.resolve({ id: "test-project" }) });
    strictEqual(res.status, 200);

    const body = await res.json();
    strictEqual(body.success, true);
    strictEqual(body.data.title, "Updated Project Title");
    strictEqual(body.data.summary, "Updated project description text.");
  });

  await t.test("Rejects invalid stage and CTA href", async () => {
    const token = await generateToken({ sub: "1", role: "admin" });
    const invalidStageRequest = new NextRequest("http://localhost/api/projects/test-project", {
      method: "PUT",
      headers: { cookie: `auth_token=${token}` },
      body: JSON.stringify({
        stage: "desconocido",
      }),
    });

    strictEqual((await PUT(invalidStageRequest, { params: Promise.resolve({ id: "test-project" }) })).status, 400);

    const invalidHrefRequest = new NextRequest("http://localhost/api/projects/test-project", {
      method: "PUT",
      headers: { cookie: `auth_token=${token}` },
      body: JSON.stringify({
        stage: "desarrollo",
        callToAction: { label: "Abrir", href: "//evil.example" },
      }),
    });

    strictEqual((await PUT(invalidHrefRequest, { params: Promise.resolve({ id: "test-project" }) })).status, 400);
  });
});

test("Projects API Route - DELETE /api/projects/[id]", async (t) => {
  const { DELETE } = await import("../app/api/projects/[id]/route");
  const { generateToken } = await import("../lib/jwt");

  await t.test("Fails when unauthenticated (no cookies)", async () => {
    const req = new NextRequest("http://localhost/api/projects/test-project", {
      method: "DELETE",
    });

    const res = await DELETE(req, { params: Promise.resolve({ id: "test-project" }) });
    strictEqual(res.status, 401);
  });

  await t.test("Fails when project does not exist", async () => {
    const token = await generateToken({ sub: "1", role: "admin" });
    const req = new NextRequest("http://localhost/api/projects/non-existent-project", {
      method: "DELETE",
      headers: {
        cookie: `auth_token=${token}`,
      },
    });

    const res = await DELETE(req, { params: Promise.resolve({ id: "non-existent-project" }) });
    strictEqual(res.status, 404);
  });

  await t.test("Succeeds deleting project when authenticated as admin", async () => {
    const token = await generateToken({ sub: "1", role: "admin" });
    const req = new NextRequest("http://localhost/api/projects/test-project", {
      method: "DELETE",
      headers: {
        cookie: `auth_token=${token}`,
      },
    });

    const res = await DELETE(req, { params: Promise.resolve({ id: "test-project" }) });
    strictEqual(res.status, 200);
    const body = await res.json();
    strictEqual(body.success, true);
    strictEqual(body.message, "Proyecto eliminado permanentemente con éxito");
  });
});
