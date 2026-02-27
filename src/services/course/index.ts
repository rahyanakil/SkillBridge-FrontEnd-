/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
export const getAllCourse = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/courses/`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      next: {
        revalidate: 5,
      },
    });
    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
export const getSingleCourse = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/courses/${id}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
        next: {
          revalidate: 5,
        },
      },
    );
    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
