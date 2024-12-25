// dummy route to test if the API/backend is working [delete later]
export async function GET() {
    return new Response(JSON.stringify({ message: 'Hello, world!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  