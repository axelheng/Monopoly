// frontend/src/app/api/health/route.js
export async function GET() {
  return Response.json({ status: "Backend is running smoothly!" });
}