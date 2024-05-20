// src/app/api/users/login/route.js
export async function GET(request) {
  return new Response(JSON.stringify({ message: "users login" }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    },
  });
}
