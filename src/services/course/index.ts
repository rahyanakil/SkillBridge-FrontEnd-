"use server";

export const getAllCourse = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/courses/`, {
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
