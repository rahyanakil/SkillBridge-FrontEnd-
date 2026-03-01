/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { revalidatePath } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// ১. টিউটরের সব বুকিং লিস্ট আনা
export const getTutorBookings = async (token: string) => {
  try {
    const res = await fetch(`${BASE_URL}/bookings/tutor-bookings`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
      cache: "no-store",
    });
    return await res.json();
  } catch (error) {
    return { success: false, data: [] };
  }
};

// ২. বুকিং স্ট্যাটাস আপডেট করা (Accept/Reject)
export const updateBookingStatus = async (
  id: string,
  status: string,
  token: string,
) => {
  try {
    const res = await fetch(`${BASE_URL}/bookings/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ status }),
    });

    const result = await res.json();
    if (res.ok) revalidatePath("/dashboard");
    return result;
  } catch (error) {
    return { success: false, message: "Update failed" };
  }
};
