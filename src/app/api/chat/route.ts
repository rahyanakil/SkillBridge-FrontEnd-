import Groq from "groq-sdk";
import { NextRequest } from "next/server";

const SYSTEM_PROMPT = `You are SkillBot, the friendly AI assistant for SkillBridge — an online tutoring platform that connects students with expert tutors for live, personalized 1-on-1 sessions.

You help users with:
- Finding the right tutors and courses for their learning goals
- Understanding how the platform works: browsing, booking, payments, and sessions
- Advice on what subjects to study and how to learn effectively
- Questions about categories (technology, design, business, and more), pricing, and platform features
- Navigating the dashboard, managing bookings, and leaving reviews

Key platform facts:
- Students browse courses, book sessions with tutors, and pay via Stripe
- Tutors create profiles and courses, and accept or reject incoming bookings
- Completed sessions can be reviewed and rated by students
- The platform has 2,400+ students, 180+ expert tutors, and a 4.9★ average rating
- Sessions are live 1-on-1 (not pre-recorded)

Helpful links to mention when relevant:
- Browse courses → /courses
- Find a tutor → /tutors
- Create an account → /register
- Sign in → /login

Tone: warm, concise, and encouraging. Keep responses short — 2-4 sentences unless the user asks for detail. If someone asks for help with a specific subject (coding, design, math, etc.), encourage them to find a tutor on SkillBridge who specialises in it rather than teaching it yourself.`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return new Response(
      "GROQ_API_KEY is not set. Add it to .env.local and restart the dev server.",
      { status: 503 },
    );
  }

  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response("Invalid messages", { status: 400 });
    }

    const client = new Groq({ apiKey });

    const stream = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",   // free, fast, high quality
      max_tokens: 512,
      stream: true,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
    });

    const readable = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content;
            if (text) controller.enqueue(encoder.encode(text));
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (err) {
    console.error("[chat] error:", err);
    return new Response("Internal server error", { status: 500 });
  }
}
