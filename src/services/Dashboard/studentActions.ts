/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// স্টুডেন্টের বুকিং লিস্ট আনা (আপনার রাউট অনুযায়ী)
export const getStudentBookings = async (token: string) => {
  try {
    const res = await fetch(`${BASE_URL}/bookings/my-bookings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token, // আপনার অ্যাডমিন ড্যাশবোর্ডের সফল ফরম্যাট
      },
      cache: "no-store",
    });

    const result = await res.json();
    // console.log("Student Bookings API Response:", result);
    return result;
  } catch (error) {
    // console.error("Fetch error:", error);
    return { success: false, data: [] };
  }
};
