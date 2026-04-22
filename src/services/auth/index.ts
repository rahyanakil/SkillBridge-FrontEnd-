"use server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(userData),
    });
    return await res.json();
  } catch (error) {
    console.log("Registration Error:", error);
    return { success: false, message: "Could not connect to the server" };
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(userData),
    });
    const result = await res.json();
    const storeCookies = await cookies();
    if (result.success && result.data?.token) {
      storeCookies.set("token", result.data.token);
    }
    return result;
  } catch (error) {
    console.log("Login Error:", error);
  }
};

interface DecodedUser {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "STUDENT" | "TUTOR";
  iat?: number;
  exp?: number;
}

export const getUser = async (): Promise<DecodedUser | null> => {
  const storeCookies = await cookies();
  const token = storeCookies.get("token")?.value;
  if (token) {
    return jwtDecode<DecodedUser>(token);
  }
  return null;
};

export const UserLogOut = async () => {
  const storeCookie = await cookies();
  storeCookie.delete("token");
};
