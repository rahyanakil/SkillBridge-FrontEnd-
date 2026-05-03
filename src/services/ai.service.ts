"use server";

import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const askAITutor = async (prompt: string): Promise<string | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  try {
    const res = await fetch(`${BASE_URL}/ai/ask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ prompt }),
    });
    const result = await res.json();
    if (result.success && result.data?.reply) return result.data.reply;
    return result.message || "Sorry, I could not generate a response.";
  } catch {
    return "Connection error. Please try again.";
  }
};
