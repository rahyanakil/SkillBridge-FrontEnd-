"use server";

import Groq from "groq-sdk";

const SYSTEM_PROMPT = `You are a professional AI Tutor on SkillBridge, an expert online tutoring platform.
Your role is to guide students step-by-step with clear, encouraging explanations.
Always format your responses using Markdown: use **bold** for key terms, bullet points for steps, and code blocks for code.
Keep answers focused, educational, and tailored to the student's question.`;

let _groq: Groq | null = null;

const getGroq = (): Groq => {
  if (_groq) return _groq;
  const key = process.env.GROQ_API_KEY;
  if (!key) throw new Error("GROQ_API_KEY is not configured.");
  _groq = new Groq({ apiKey: key });
  return _groq;
};

export const askAITutor = async (prompt: string): Promise<string> => {
  try {
    const completion = await getGroq().chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 1024,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
    });
    return completion.choices[0]?.message?.content?.trim() || "No response received.";
  } catch (err: any) {
    if (err?.status === 429 || err?.message?.includes("429")) {
      return "The AI is at capacity right now. Please wait a moment and try again.";
    }
    console.error("[AI Tutor]", err?.message);
    return "An error occurred. Please try again.";
  }
};
