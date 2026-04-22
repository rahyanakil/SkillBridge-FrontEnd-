"use server";

import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const getToken = async () => {
  const store = await cookies();
  return store.get("token")?.value ?? null;
};

export const getNotifications = async () => {
  const token = await getToken();
  if (!token) return { success: false, data: [] };
  try {
    const res = await fetch(`${BASE_URL}/notifications`, {
      headers: { Authorization: token },
      cache: "no-store",
    });
    return await res.json();
  } catch {
    return { success: false, data: [] };
  }
};

export const getUnreadCount = async () => {
  const token = await getToken();
  if (!token) return { success: false, data: { unreadCount: 0 } };
  try {
    const res = await fetch(`${BASE_URL}/notifications/unread-count`, {
      headers: { Authorization: token },
      cache: "no-store",
    });
    return await res.json();
  } catch {
    return { success: false, data: { unreadCount: 0 } };
  }
};

export const markNotificationRead = async (id: string) => {
  const token = await getToken();
  if (!token) return { success: false };
  try {
    const res = await fetch(`${BASE_URL}/notifications/${id}/read`, {
      method: "PATCH",
      headers: { Authorization: token },
    });
    return await res.json();
  } catch {
    return { success: false };
  }
};

export const markAllRead = async () => {
  const token = await getToken();
  if (!token) return { success: false };
  try {
    const res = await fetch(`${BASE_URL}/notifications/read-all`, {
      method: "PATCH",
      headers: { Authorization: token },
    });
    return await res.json();
  } catch {
    return { success: false };
  }
};
