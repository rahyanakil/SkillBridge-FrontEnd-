"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const getAllReviews = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews`, {
      method: "GET",
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return [];
    }

    const result = await res.json();
    return result?.data || [];
  } catch (error) {
    console.error("Fetch Network Error:", error);
    return [];
  }
};

export const createReview = async (reviewData: {
  bookingId: string;
  rating: number;
  comment: string;
}) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return { success: false, message: "Please login to submit a review." };
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        bookingId: reviewData.bookingId,
        rating: reviewData.rating,
        comment: reviewData.comment,
      }),
    });

    const result = await res.json();

    if (res.ok) {
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
