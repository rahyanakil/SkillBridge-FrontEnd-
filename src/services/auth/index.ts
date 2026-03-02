"use server";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

// ১. টাইপ ডেফিনেশন: টোকেন থেকে রোল এবং নাম পাওয়ার জন্য
interface CustomJwtPayload extends JwtPayload {
  role: "ADMIN" | "STUDENT" | "TUTOR";
  name?: string;
  email?: string;
  id?: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

/**
 * ২. Register User Logic
 * ইউজারকে ডাটাবেসে রেজিস্টার করে।
 */
export const registerUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(userData),
    });

    const result = await res.json();
    return result;
  } catch (error) {
    console.log("Registration Error:", error);
    return { success: false, message: "Could not connect to the server" };
  }
};

/**
 * ৩. Login User Logic
 * টোকেন রিসিভ করে এবং ব্রাউজার কুকিতে সেট করে।
 */
export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(userData),
    });

    const result = await res.json();
    const storeCookies = await cookies();

    if (result.success && result.data?.accessToken) {
      // টোকেন সেভ করা হচ্ছে
      storeCookies.set("token", result.data.accessToken);
    }
    return result;
  } catch (error) {
    console.log("Login Error:", error);
    return { success: false, message: "Login failed" };
  }
};

/**
 * ৪. Get Decoded User Info
 * কুকি থেকে টোকেন নিয়ে ডিকোড করে ইউজারের রোল ও ডাটা রিটার্ন করে।
 */
export const getUser = async () => {
  try {
    const storeCookies = await cookies();
    const token = storeCookies.get("token")?.value;

    if (token) {
      // টাইপ কাস্টিং করে ডিকোড করা হচ্ছে যাতে role পাওয়া যায়
      const decoded = jwtDecode<CustomJwtPayload>(token);
      return decoded;
    }
    return null;
  } catch (error) {
    console.error("JWT Decode Error:", error);
    return null;
  }
};

/**
 * ৫. User Logout
 * কুকি থেকে টোকেন ডিলিট করে দেয়।
 */
export const UserLogOut = async () => {
  const storeCookie = await cookies();
  storeCookie.delete("token");
};

/**
 * ৬. Get Current Access Token
 * সরাসরি টোকেন স্ট্রিংটি পাওয়ার জন্য (অন্যান্য API কলে পাঠানোর জন্য)।
 */
export const getAccessToken = async () => {
  const storeCookies = await cookies();
  return storeCookies.get("token")?.value;
};
