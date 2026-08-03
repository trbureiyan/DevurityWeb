import { test } from "node:test";
import { strictEqual } from "node:assert/strict";
import { NextRequest } from "next/server";
import { csrfAdapter } from "../lib/csrf";
import { GET } from "../app/api/auth/csrf-token/route";

test("GET /api/auth/csrf-token reuses the existing cookie token", async () => {
  const token = csrfAdapter.generateToken();
  const request = new NextRequest("http://localhost/api/auth/csrf-token", {
    headers: { cookie: `csrf_token=${token}` },
  });

  const response = await GET(request);
  const body = await response.json();

  strictEqual(body.csrfToken, token);
});
