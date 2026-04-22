"use server";

import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const getToken = async () => {
  const store = await cookies();
  return store.get("token")?.value ?? null;
};

export const createPaymentIntent = async (bookingId: string) => {
  const token = await getToken();
  if (!token) return { success: false, message: "Not authenticated", data: null };
  try {
    const res = await fetch(`${BASE_URL}/payments/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({ bookingId }),
      cache: "no-store",
    });
    return await res.json();
  } catch {
    return { success: false, message: "Failed to create payment session", data: null };
  }
};

export const confirmPayment = async (bookingId: string, paymentIntentId: string) => {
  const token = await getToken();
  if (!token) return { success: false, message: "Not authenticated" };
  try {
    const res = await fetch(`${BASE_URL}/payments/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({ bookingId, paymentIntentId }),
    });
    return await res.json();
  } catch {
    return { success: false, message: "Failed to confirm payment" };
  }
};
