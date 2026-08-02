import { test } from "node:test";
import { ok, strictEqual } from "node:assert/strict";
import { NextRequest } from "next/server";

let currentRole = "user";

const mockPrisma = {
  users: {
    findUnique: async () => ({
      id: 1n,
      email: "user@usco.edu.co",
      name: "Test User",
      last_name: "USCO",
      is_active: true,
      roles: { name: currentRole },
    }),
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).prisma = mockPrisma;
process.env.JWT_SECRET = "supersecretkeyfortestingpurposesonly";

test("Role changes take effect only after refreshing the JWT", async () => {
  const [{ POST: refresh }, { middleware }, { generateToken, validateToken }] = await Promise.all([
    import("../app/api/auth/refresh/route"),
    import("../middleware"),
    import("../lib/jwt"),
  ]);

  const oldToken = await generateToken({ sub: "1", role: "user" });
  const oldRequest = new NextRequest("http://localhost/admin", {
    headers: { cookie: `auth_token=${oldToken}` },
  });
  const deniedResponse = await middleware(oldRequest);
  strictEqual(deniedResponse.status, 307);

  currentRole = "admin";
  const refreshRequest = new NextRequest("http://localhost/api/auth/refresh", {
    method: "POST",
    headers: { cookie: `auth_token=${oldToken}` },
  });
  const refreshResponse = await refresh(refreshRequest);
  strictEqual(refreshResponse.status, 200);

  const setCookie = refreshResponse.headers.get("set-cookie");
  const refreshedToken = setCookie?.match(/^auth_token=([^;]+)/)?.[1];
  ok(refreshedToken);

  const refreshedPayload = await validateToken(refreshedToken);
  strictEqual((refreshedPayload as { role: string }).role, "admin");

  const allowedRequest = new NextRequest("http://localhost/admin", {
    headers: { cookie: `auth_token=${refreshedToken}` },
  });
  const allowedResponse = await middleware(allowedRequest);
  strictEqual(allowedResponse.status, 200);
});
