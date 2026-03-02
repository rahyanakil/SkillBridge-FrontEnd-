"use server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

// ১. Register User Logic with Auto-Tutor Profile
export const registerUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(userData),
      },
    );

    const result = await res.json();

    // 🔥 গুরুত্বপূর্ণ: যদি ইউজার 'TUTOR' হয়, তবে ডাটাবেসে টিউটর প্রোফাইল অ্যাক্টিভ থাকতে হবে।
    // আপনার ব্যাকএন্ড যদি রেজিস্ট্রেশনের সময় অটো টিউটর প্রোফাইল না বানায়,
    // তবে এখানে একটি আলাদা API কল করতে হবে যা টিউটর টেবিলে ডাটা ইনসার্ট করবে।

    return result;
  } catch (error) {
    console.log("Registration Error:", error);
    return { success: false, message: "Could not connect to the server" };
  }
};

// ২. Login User Logic
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

export const getUser = async () => {
  const storeCookies = await cookies();
  const token = storeCookies.get("token")?.value;
  if (token) return await jwtDecode(token);
  return null;
};

export const UserLogOut = async () => {
  const storeCookie = await cookies();
  storeCookie.delete("token");
};
