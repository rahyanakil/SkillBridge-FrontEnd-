/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const AddReviewForm = ({ bookingId, onReviewAdded }: any) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data: any) => {
    if (rating === 0) return toast.error("Please select a rating!");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ bookingId, rating, comment: data.comment }),
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Review added successfully!");
        reset();
        setRating(0);

        // যদি ডাটা ইনস্ট্যান্টলি আপডেট করার ফাংশন থাকে
        if (onReviewAdded) {
          onReviewAdded(result.data);
        }

        // পেজ রিফ্রেশ করে নতুন ডাটা দেখানোর জন্য
        router.refresh();
      } else {
        toast.error(result.message || "Failed to add review");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-8 rounded-[2rem] border-2 border-dashed border-violet-100 space-y-6 shadow-sm"
    >
      <div className="space-y-1">
        <h3 className="text-xl font-black text-slate-900 italic">
          Share your <span className="text-violet-600">experience</span>
        </h3>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
          How was your learning session?
        </p>
      </div>

      <div className="flex gap-2 bg-slate-50 w-fit p-3 rounded-2xl">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="transition-transform hover:scale-110"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          >
            <Star
              className={`w-8 h-8 transition-colors ${
                star <= (hover || rating)
                  ? "fill-amber-400 text-amber-400"
                  : "text-slate-200"
              }`}
            />
          </button>
        ))}
      </div>

      <Textarea
        {...register("comment", { required: true })}
        placeholder="Write your feedback here..."
        className="rounded-2xl border-slate-100 focus:border-violet-500 min-h-30 bg-slate-50/50 p-4 font-medium"
      />

      <Button
        disabled={isSubmitting}
        className="w-full rounded-2xl bg-violet-600 hover:bg-slate-900 h-14 font-black uppercase tracking-widest shadow-lg shadow-violet-100 transition-all"
      >
        {isSubmitting ? (
          <Loader2 className="animate-spin" />
        ) : (
          "Submit Feedback"
        )}
      </Button>
    </form>
  );
};
