"use server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getAllPublicTutors = async () => {
  try {
    const res = await fetch(`${BASE_URL}/tutors`, {
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
      cache: "no-store",
    });
    if (!res.ok) return { success: false, data: null, message: "Tutor not found" };
    return await res.json();
  } catch (error) {
    console.error("Single Tutor Fetch Error:", error);
    return { success: false, data: null, message: "Server error occurred" };
  }
};
