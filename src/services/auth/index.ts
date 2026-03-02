"use server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

// ১. Register User Logic
export const registerUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userData),
      },
    );

    const result = await res.json();

    // নোট: সাধারণত রেজিস্ট্রেশনের পর সরাসরি লগইন করাতে চাইলে এখানে টোকেন সেট করা যায়।
    // কিন্তু আপনার ব্যাকএন্ড যদি শুধু ইউজার ডাটা পাঠায়, তবে আমরা শুধু রেজাল্ট রিটার্ন করব।
    return result;
  } catch (error) {
    console.log("Registration Error:", error);
    return {
      success: false,
      message: "Could not connect to the server",
    };
  }
};

// ২. Login User Logic (আপনার দেওয়া কোড)
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

    if (result.success && result.data?.token) {
      // টোকেন কুকিতে সেভ করা হচ্ছে
      storeCookies.set("token", result.data.token);
    }
    return result;
  } catch (error) {
    console.log("Login Error:", error);
  }
};

// ৩. Get Current User Logic
export const getUser = async () => {
  const storeCookies = await cookies();
  const token = storeCookies.get("token")?.value;

  let decodedData = null;
  if (token) {
    decodedData = await jwtDecode(token);
    return decodedData;
  } else {
    return null;
  }
};

// ৪. Logout Logic
export const UserLogOut = async () => {
  const storeCookie = await cookies();
  storeCookie.delete("token");
};

// "use server";
// import { jwtDecode } from "jwt-decode";
// import { cookies } from "next/headers";
// import { FieldValues } from "react-hook-form";

// export const loginUser = async (userData: FieldValues) => {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
//       method: "POST",
//       headers: {
//         "content-type": "application/json",
//       },
//       body: JSON.stringify(userData),
//     });
//     const result = await res.json();
//     const storeCookies = await cookies();
//     if (result.success) {
//       storeCookies.set("token", result.data?.token);
//     }
//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getUser = async () => {
//   const storeCookies = await cookies();
//   const token = storeCookies.get("token")?.value;
//   // console.log(token);
//   let decodedData = null;
//   if (token) {
//     decodedData = await jwtDecode(token);
//     return decodedData;
//   } else {
//     return null;
//   }
// };
// export const UserLogOut = async () => {
//   const storeCookie = await cookies();
//   storeCookie.delete("token");
// };
