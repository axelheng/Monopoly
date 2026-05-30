export async function POST(request) {
  const { email } = await request.json();

  return Response.json({
    message: "Login successful!",
    user: {
      id: 1,
      email: email,
    },
  });
}