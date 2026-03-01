"use server";

import { revalidatePath } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; // নিশ্চিত করুন এখানে http://localhost:5000/api/v1 আছে

// ১. পোস্টম্যান অনুযায়ী সব ইউজার ফেচ করা (Admin Endpoint)
export const getAllUsers = async (token: string) => {
  try {
    // পোস্টম্যানে যদি পাথ /admin/users হয় তবে এখানে সেটা দিন
    const res = await fetch(`${BASE_URL}/admin/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
      cache: "no-store",
    });

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Fetch error:", error);
    return { success: false, data: [] };
  }
};

// ২. ইউজার ডিলিট করা
export const deleteUser = async (userId: string, token: string) => {
  try {
    const res = await fetch(`${BASE_URL}/admin/users/${userId}`, {
      method: "DELETE",
      headers: { Authorization: token! },
    });

    const result = await res.json();
    if (res.ok) revalidatePath("/dashboard");
    return result;
  } catch (error) {
    return { success: false, message: "Delete failed" };
  }
};
