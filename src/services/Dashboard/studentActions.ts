"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const getToken = async () => {
  const store = await cookies();
  return store.get("token")?.value ?? null;
};

export const getStudentBookings = async () => {
  const token = await getToken();
  if (!token) return { success: false, data: [] };
  try {
    const res = await fetch(`${BASE_URL}/bookings/my-bookings`, {
      headers: { Authorization: token },
      cache: "no-store",
    });
    return await res.json();
  } catch {
    return { success: false, data: [] };
  }
};

export const getCompletedCourses = async () => {
  const token = await getToken();
  if (!token) return { success: false, data: [] };
  try {
    const res = await fetch(`${BASE_URL}/bookings/completed`, {
      headers: { Authorization: token },
      cache: "no-store",
    });
    return await res.json();
  } catch {
    return { success: false, data: [] };
  }
};

export const cancelBooking = async (bookingId: string) => {
  const token = await getToken();
  if (!token) return { success: false, message: "Not authenticated" };
  try {
    const res = await fetch(`${BASE_URL}/bookings/${bookingId}/cancel`, {
      method: "PATCH",
      headers: { Authorization: token },
    });
    const result = await res.json();
    if (res.ok) revalidatePath("/dashboard");
    return result;
  } catch {
    return { success: false, message: "Cancel failed" };
  }
};

export const getClassroomLink = async (bookingId: string) => {
  const token = await getToken();
  if (!token) return { success: false, message: "Not authenticated" };
  try {
    const res = await fetch(`${BASE_URL}/bookings/${bookingId}/classroom`, {
      headers: { Authorization: token },
      cache: "no-store",
    });
    return await res.json();
  } catch {
    return { success: false, message: "Failed to get link" };
  }
};

export const getRecommendations = async () => {
  const token = await getToken();
  if (!token) return { success: false, data: [] };
  try {
    const res = await fetch(`${BASE_URL}/courses/recommendations/me`, {
      headers: { Authorization: token },
      cache: "no-store",
    });
    return await res.json();
  } catch {
    return { success: false, data: [] };
  }
};

export const createPaymentCheckout = async (bookingId: string) => {
  const token = await getToken();
  if (!token) return { success: false, message: "Not authenticated" };
  try {
    const res = await fetch(`${BASE_URL}/payments/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({ bookingId }),
    });
    return await res.json();
  } catch {
    return { success: false, message: "Payment initiation failed" };
  }
};

export const verifyPayment = async (bookingId: string) => {
  const token = await getToken();
  if (!token) return { success: false, message: "Not authenticated" };
  try {
    const res = await fetch(`${BASE_URL}/payments/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({ bookingId }),
    });
    const result = await res.json();
    if (res.ok) revalidatePath("/dashboard");
    return result;
  } catch {
    return { success: false, message: "Payment verification failed" };
  }
};
