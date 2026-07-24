import { generateChallenge } from "@/lib/altcha";

export const dynamic = "force-dynamic";

export async function GET() {
  const challenge = await generateChallenge();
  return Response.json(challenge, {
    headers: { "Cache-Control": "no-store" },
  });
}
