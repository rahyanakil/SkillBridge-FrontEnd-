"use server";

export const getAllCourse = async (params?: { limit?: number; page?: number }) => {
  try {
    const query = new URLSearchParams();
    if (params?.limit) query.set("limit", String(params.limit));
    if (params?.page) query.set("page", String(params.page));
    const qs = query.toString();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/courses/${qs ? `?${qs}` : ""}`, {
      method: "GET",
      next: { revalidate: 300 },
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, data: null, message: error?.message || "Failed to fetch courses" };
  }
};

export const getSingleCourse = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/courses/${id}`, {
      method: "GET",
      next: { revalidate: 300 },
    });
    return await res.json();
  } catch (error: any) {
    return { success: false, data: null, message: error?.message || "Failed to fetch course" };
  }
};
