"use server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await res.json();
    const storeCookies = await cookies();
    if (result.success) {
      storeCookies.set("token", result.data?.token);
    }
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async () => {
  const storeCookies = await cookies();
  const token = storeCookies.get("token")?.value;
  // console.log(token);
  let decodedData = null;
  if (token) {
    decodedData = await jwtDecode(token);
    return decodedData;
  } else {
    return null;
  }
};
export const UserLogOut = async () => {
  const storeCookie = await cookies();
  storeCookie.delete("token");
};
