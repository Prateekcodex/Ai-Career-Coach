import { generateCoverLetter } from "@/actions/cover-letter";

export async function POST(req) {
  const data = await req.json();
  try {
    await generateCoverLetter(data);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}