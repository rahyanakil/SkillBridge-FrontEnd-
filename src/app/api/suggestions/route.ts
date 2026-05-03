import Groq from "groq-sdk";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return new Response("[]", { status: 200 });

  try {
    const { query } = await req.json();
    if (!query || query.trim().length < 2) return new Response("[]");

    const client = new Groq({ apiKey });

    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      max_tokens: 120,
      temperature: 0.4,
      messages: [
        {
          role: "system",
          content:
            "You are a search assistant for SkillBridge, an online tutoring platform. Given a partial search query, respond with exactly 5 concise search suggestions as a JSON array of strings. Only output valid JSON — no explanation, no markdown.",
        },
        {
          role: "user",
          content: `Partial query: "${query}"\n\nRespond with a JSON array of 5 search suggestions.`,
        },
      ],
    });

    const text = completion.choices[0]?.message?.content ?? "[]";
    // Extract JSON array from response
    const match = text.match(/\[[\s\S]*?\]/);
    const suggestions = match ? JSON.parse(match[0]) : [];
    return new Response(JSON.stringify(suggestions.slice(0, 5)), {
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response("[]", { headers: { "Content-Type": "application/json" } });
  }
}
