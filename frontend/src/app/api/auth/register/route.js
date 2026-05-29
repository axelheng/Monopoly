export async function POST(request) {
  const body = await request.json();
  return Response.json({ message: "register route works", body });
}