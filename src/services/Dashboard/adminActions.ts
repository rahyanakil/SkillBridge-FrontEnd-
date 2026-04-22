"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const getToken = async (): Promise<string | null> => {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value ?? null;
};

export const getAllUsers = async () => {
  const token = await getToken();
  if (!token) return { success: false, message: "Not authenticated", data: [] };
  try {
    const res = await fetch(`${BASE_URL}/admin/users`, {
      headers: { Authorization: token },
      cache: "no-store",
    });
    return await res.json();
  } catch {
    return { success: false, data: [] };
  }
};

export const deleteUser = async (userId: string) => {
  const token = await getToken();
  if (!token) return { success: false, message: "Not authenticated" };
  try {
    const res = await fetch(`${BASE_URL}/admin/users/${userId}`, {
      method: "DELETE",
      headers: { Authorization: token },
    });
    const result = await res.json();
    if (res.ok) revalidatePath("/dashboard");
    return result;
  } catch {
    return { success: false, message: "Delete failed" };
  }
};

export const getAdminStats = async () => {
  const token = await getToken();
  if (!token) return { success: false, data: null };
  try {
    const res = await fetch(`${BASE_URL}/admin/stats`, {
      headers: { Authorization: token },
      cache: "no-store",
    });
    return await res.json();
  } catch {
    return { success: false, data: null };
  }
};

export const updateUserBanStatus = async (userId: string, isBanned: boolean) => {
  const token = await getToken();
  if (!token) return { success: false, message: "Not authenticated" };
  try {
    const res = await fetch(`${BASE_URL}/admin/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({ isBanned }),
    });
    const result = await res.json();
    if (res.ok) revalidatePath("/dashboard");
    return result;
  } catch {
    return { success: false, message: "Update failed" };
  }
};

export const getAdminBookings = async () => {
  const token = await getToken();
  if (!token) return { success: false, data: [] };
  try {
    const res = await fetch(`${BASE_URL}/admin/bookings`, {
      headers: { Authorization: token },
      cache: "no-store",
    });
    return await res.json();
  } catch {
    return { success: false, data: [] };
  }
};

export const adminUpdateBookingStatus = async (bookingId: string, status: string) => {
  const token = await getToken();
  if (!token) return { success: false, message: "Not authenticated" };
  try {
    const res = await fetch(`${BASE_URL}/admin/bookings/${bookingId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({ status }),
    });
    const result = await res.json();
    if (res.ok) revalidatePath("/dashboard");
    return result;
  } catch {
    return { success: false, message: "Update failed" };
  }
};

export const adminDeleteCourse = async (courseId: string) => {
  const token = await getToken();
  if (!token) return { success: false, message: "Not authenticated" };
  try {
    const res = await fetch(`${BASE_URL}/admin/courses/${courseId}`, {
      method: "DELETE",
      headers: { Authorization: token },
    });
    const result = await res.json();
    if (res.ok) revalidatePath("/dashboard");
    return result;
  } catch {
    return { success: false, message: "Delete failed" };
  }
};

export const adminCreateCategory = async (data: { name: string; description?: string }) => {
  const token = await getToken();
  if (!token) return { success: false, message: "Not authenticated" };
  try {
    const res = await fetch(`${BASE_URL}/admin/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (res.ok) revalidatePath("/dashboard");
    return result;
  } catch {
    return { success: false, message: "Category creation failed" };
  }
};

export const adminDeleteCategory = async (categoryId: string) => {
  const token = await getToken();
  if (!token) return { success: false, message: "Not authenticated" };
  try {
    const res = await fetch(`${BASE_URL}/admin/categories/${categoryId}`, {
      method: "DELETE",
      headers: { Authorization: token },
    });
    const result = await res.json();
    if (res.ok) revalidatePath("/dashboard");
    return result;
  } catch {
    return { success: false, message: "Delete failed" };
  }
};
