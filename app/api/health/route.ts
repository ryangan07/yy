// Uptime monitor target. Deliberately touches no database so it stays cheap and always answers.
export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({ status: "ok" }, { headers: { "Cache-Control": "no-store" } });
}
