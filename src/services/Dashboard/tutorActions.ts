"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const getToken = async () => {
  const store = await cookies();
  return store.get("token")?.value ?? null;
};

export const getMyTutorProfile = async () => {
  const token = await getToken();
  if (!token) return { success: false, data: null };
  try {
    const res = await fetch(`${BASE_URL}/tutors/me`, {
      headers: { Authorization: token },
      cache: "no-store",
    });
    if (res.ok) return await res.json();
    return { success: false, data: null };
  } catch {
    return { success: false, data: null };
  }
};

export const getTutorBookings = async () => {
  const token = await getToken();
  if (!token) return { success: false, data: [] };
  try {
    const res = await fetch(`${BASE_URL}/bookings/tutor-bookings`, {
      headers: { Authorization: token },
      cache: "no-store",
    });
    return await res.json();
  } catch {
    return { success: false, data: [] };
  }
};

export const updateBookingStatus = async (id: string, status: string) => {
  const token = await getToken();
  if (!token) return { success: false, message: "Not authenticated" };
  try {
    const res = await fetch(`${BASE_URL}/bookings/${id}/status`, {
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

export const getTutorEarnings = async () => {
  const token = await getToken();
  if (!token) return { success: false, data: null };
  try {
    const res = await fetch(`${BASE_URL}/tutors/earnings`, {
      headers: { Authorization: token },
      cache: "no-store",
    });
    return await res.json();
  } catch {
    return { success: false, data: null };
  }
};

export const getTutorCourses = async (userId: string) => {
  try {
    const res = await fetch(`${BASE_URL}/tutors/profile/${userId}`, {
      cache: "no-store",
    });
    const result = await res.json();
    return result?.data?.courses || [];
  } catch {
    return [];
  }
};

export const deleteTutorCourse = async (courseId: string) => {
  const token = await getToken();
  if (!token) return { success: false, message: "Not authenticated" };
  try {
    const res = await fetch(`${BASE_URL}/courses/${courseId}`, {
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

export const createTutorCourse = async (courseData: {
  title: string;
  description: string;
  price: number;
  categoryId: string;
}) => {
  const token = await getToken();
  if (!token) return { success: false, message: "Not authenticated" };
  try {
    const res = await fetch(`${BASE_URL}/courses`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify(courseData),
    });
    const result = await res.json();
    if (res.ok) revalidatePath("/dashboard");
    return result;
  } catch {
    return { success: false, message: "Course creation failed" };
  }
};

export const updateTutorCourse = async (courseId: string, courseData: {
  title?: string;
  description?: string;
  price?: number;
}) => {
  const token = await getToken();
  if (!token) return { success: false, message: "Not authenticated" };
  try {
    const res = await fetch(`${BASE_URL}/courses/${courseId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify(courseData),
    });
    const result = await res.json();
    if (res.ok) revalidatePath("/dashboard");
    return result;
  } catch {
    return { success: false, message: "Course update failed" };
  }
};

export const createOrUpdateTutorProfile = async (profileData: {
  bio: string;
  expertise: string;
  hourlyRate: number;
  experience: number;
}) => {
  const token = await getToken();
  if (!token) return { success: false, message: "Not authenticated" };
  try {
    const res = await fetch(`${BASE_URL}/tutors/profile`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify(profileData),
    });
    const result = await res.json();
    if (res.ok) revalidatePath("/dashboard");
    return result;
  } catch {
    return { success: false, message: "Profile update failed" };
  }
};

export const getClassroomLink = async (bookingId: string) => {
  const token = await getToken();
  if (!token) return { success: false, message: "Not authenticated" };
  try {
    const res = await fetch(`${BASE_URL}/bookings/${bookingId}/classroom`, {
      headers: { Authorization: token },
      cache: "no-store",
    });
    return await res.json();
  } catch {
    return { success: false, message: "Failed to get link" };
  }
};
