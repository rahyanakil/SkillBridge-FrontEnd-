/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

export const createBooking = async (bookingData: {
  courseId: string;
  startDate: string;
  endDate: string;
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
        // ১. Bearer প্রিফিক্স যোগ করা হয়েছে (এটি চেক করুন আপনার ব্যাকএন্ডে লাগে কি না)
        Authorization: token,
      },
      body: JSON.stringify({
        courseId: bookingData.courseId,
        // ২. স্ট্রিং ডেটকে ISO ফরম্যাটে রূপান্তর করা (ব্যাকএন্ড সাধারণত এটিই চায়)
        schedule: new Date(bookingData.startDate).toISOString(),
        endDate: new Date(bookingData.endDate).toISOString(),
      }),
    });

    const result = await res.json();

    // ৩. যদি ব্যাকএন্ড থেকে এরর আসে তবে তা ডিবাগ করার জন্য
    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Validation failed on server",
        errors: result.errors, // যদি ব্যাকএন্ড স্পেসিফিক এরর লিস্ট পাঠায়
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
