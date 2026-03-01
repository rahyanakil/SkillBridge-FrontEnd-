/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getAdminAnalytics = async (token: string) => {
  const res = await fetch(`${BASE_URL}/admin/analytics`, {
    headers: { Authorization: token! },
    next: { revalidate: 10 }, // Short cache for dashboard
  });
  return res.json();
};

export const getAllUsers = async (token: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    const result = await res.json();
    console.log("API Response:", result); // এটি চেক করুন কনসোলে কি আসে
    return result;
  } catch (error) {
    console.error("Fetch error:", error);
    return { success: false, data: [] };
  }
};

export const updateUserStatus = async (
  userId: string,
  data: any,
  token: string,
) => {
  const res = await fetch(`${BASE_URL}/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token!,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteUser = async (userId: string, token: string) => {
  const res = await fetch(`${BASE_URL}/users/${userId}`, {
    method: "DELETE",
    headers: { Authorization: token! },
  });
  return res.json();
};
