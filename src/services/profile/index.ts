"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const getToken = async () => {
  const store = await cookies();
  return store.get("token")?.value ?? null;
};

export const getProfile = async () => {
  const token = await getToken();
  if (!token) return null;
  try {
    const res = await fetch(`${BASE_URL}/auth/get-me`, {
      headers: { Authorization: token },
      cache: "no-store",
    });
    const result = await res.json();
    return result?.data || null;
  } catch {
    return null;
  }
};

export const updateProfile = async (data: { name?: string; email?: string }) => {
  const token = await getToken();
  if (!token) return { success: false, message: "Not authenticated" };
  try {
    const res = await fetch(`${BASE_URL}/auth/profile`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (res.ok) revalidatePath("/profile");
    return result;
  } catch {
    return { success: false, message: "Update failed" };
  }
};

export const changePassword = async (data: { oldPassword: string; newPassword: string }) => {
  const token = await getToken();
  if (!token) return { success: false, message: "Not authenticated" };
  try {
    const res = await fetch(`${BASE_URL}/auth/password`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch {
    return { success: false, message: "Password change failed" };
  }
};

export const uploadAvatar = async (formData: FormData) => {
  const token = await getToken();
  if (!token) return { success: false, message: "Not authenticated" };
  try {
    const res = await fetch(`${BASE_URL}/auth/avatar`, {
      method: "POST",
      headers: { Authorization: token },
      body: formData,
    });
    const result = await res.json();
    if (res.ok) revalidatePath("/profile");
    return result;
  } catch {
    return { success: false, message: "Upload failed" };
  }
};
