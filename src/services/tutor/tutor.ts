"use server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getAllPublicTutors = async (params?: { limit?: number; page?: number }) => {
  try {
    const query = new URLSearchParams();
    if (params?.limit) query.set("limit", String(params.limit));
    if (params?.page) query.set("page", String(params.page));
    const qs = query.toString();
    const res = await fetch(`${BASE_URL}/tutors${qs ? `?${qs}` : ""}`, {
      method: "GET",
      next: { revalidate: 60, tags: ["tutors"] },
    });
    if (!res.ok) throw new Error("Failed to fetch tutors");
    return await res.json();
  } catch (error) {
    console.error("All Tutors Fetch Error:", error);
    return { success: false, data: [], message: "Could not load tutors" };
  }
};

export const getSingleTutor = async (id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/tutors/profile/${id}`, {
      method: "GET",
      next: { revalidate: 300 },
    });
    if (!res.ok) return { success: false, data: null, message: "Tutor not found" };
    return await res.json();
  } catch (error) {
    console.error("Single Tutor Fetch Error:", error);
    return { success: false, data: null, message: "Server error occurred" };
  }
};
