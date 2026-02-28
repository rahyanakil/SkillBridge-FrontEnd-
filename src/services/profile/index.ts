/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

export const getProfile = async () => {
  const store = await cookies();
  const token = store.get("token")?.value;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/get-me`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: token!,
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
