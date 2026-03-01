export const getAllCategories = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories`, {
      next: { revalidate: 3600 }, // ১ ঘণ্টা ক্যাশ থাকবে
    });
    const result = await res.json();
    return result?.data || [];
  } catch (error) {
    console.error("Category fetch error:", error);
    return [];
  }
};
