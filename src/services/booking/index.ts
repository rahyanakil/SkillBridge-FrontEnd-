"use server";

import { cookies } from "next/headers";

export const createBooking = async (bookingData: {
  courseId: string;
  startDate: string;
}) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return {
        success: false,
        message: "Please login as student first to book a session!",
      };
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        courseId: bookingData.courseId,
        schedule: new Date(bookingData.startDate).toISOString(),
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Validation failed on server",
        errors: result.errors,
      };
    }

    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Server connection failed",
    };
  }
};
