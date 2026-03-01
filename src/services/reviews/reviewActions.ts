/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";

// ১. সকল রিভিউ ফেচ করার জন্য (হোম পেজের জন্য)
export const getAllReviews = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

    // ১. চেক করুন ইউআরএলটি ঠিকমতো পাচ্ছে কি না
    console.log("Fetching from:", `${baseUrl}/reviews/`);

    const res = await fetch(`${baseUrl}/reviews`, {
      method: "GET",
      cache: "no-store", // ক্যাশ অফ করে চেক করুন
    });

    // ২. যদি রেসপন্স OK না হয়, তবে স্ট্যাটাস কোড প্রিন্ট করুন
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error(`API Error: ${res.status}`, errorData);
      return []; // এরর থ্রো না করে খালি অ্যারে রিটার্ন করুন যাতে পেজ ক্রাশ না করে
    }

    const result = await res.json();
    return result?.data || [];
  } catch (error) {
    console.error("Fetch Network Error:", error);
    return [];
  }
};

// ২. নতুন রিভিউ তৈরি করার জন্য (স্টুডেন্ট ড্যাশবোর্ড থেকে)
export const createReview = async (reviewData: {
  bookingId: string;
  rating: number;
  comment: string;
  token: string; // ক্লায়েন্ট থেকে টোকেন পাস করতে হবে
}) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: reviewData.token,
      },
      body: JSON.stringify({
        bookingId: reviewData.bookingId,
        rating: reviewData.rating,
        comment: reviewData.comment,
      }),
    });

    const result = await res.json();

    if (res.ok) {
      // রিভিউ অ্যাড হওয়ার পর হোম পেজ রিভ্যালিডেট করা যাতে নতুন রিভিউ দেখা যায়
      revalidatePath("/");
      return { success: true, data: result.data };
    } else {
      return {
        success: false,
        message: result.message || "Failed to add review",
      };
    }
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
