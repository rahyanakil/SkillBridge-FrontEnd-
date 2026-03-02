"use server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

/**
 * ১. সব পাবলিক টিউটরদের লিস্ট নিয়ে আসবে (Landing Page এর জন্য)
 */
export const getAllPublicTutors = async () => {
  try {
    const res = await fetch(`${BASE_URL}/tutors`, {
      method: "GET",
      // ISR: ডাটা ১ মিনিট পর পর ব্যাকগ্রাউন্ডে আপডেট হবে
      next: { revalidate: 60, tags: ["tutors"] },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch tutors");
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("All Tutors Fetch Error:", error);
    return { success: false, data: [], message: "Could not load tutors" };
  }
};

/**
 * ২. নির্দিষ্ট একজন টিউটরের ডিটেইলস নিয়ে আসবে (Details Page এর জন্য)
 * @param id - এটি টিউটরের userId হতে হবে আপনার রাউটিং অনুযায়ী
 */
export const getSingleTutor = async (id: string) => {
  try {
    // লক্ষ্য করুন: এখানে URL শেষে ID পাঠানো হচ্ছে
    const res = await fetch(`${BASE_URL}/tutors/${id}`, {
      method: "GET",
      cache: "no-store", // ডিটেইলস পেজে আমরা সবসময় লেটেস্ট ডাটা চাই
    });

    if (!res.ok) {
      return { success: false, data: null, message: "Tutor not found" };
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Single Tutor Fetch Error:", error);
    return { success: false, data: null, message: "Server error occurred" };
  }
};
