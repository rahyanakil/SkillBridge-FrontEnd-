// "use client";

// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Loader2, Star } from "lucide-react";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";

// export const AddReviewForm = ({ bookingId, onReviewAdded }: any) => {
//   const [rating, setRating] = useState(0);
//   const [hover, setHover] = useState(0);
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { isSubmitting },
//   } = useForm();

//   const onSubmit = async (data: any) => {
//     if (rating === 0) return toast.error("Please select a rating!");

//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`, // বা আপনার কুকি থেকে টোকেন নিন
//         },
//         body: JSON.stringify({ bookingId, rating, comment: data.comment }),
//       });

//       const result = await res.json();
//       if (result.success) {
//         toast.success("Review added instantly!");
//         reset();
//         setRating(0);
//         onReviewAdded(result.data); // ইন্সট্যান্টলি লিস্টে যোগ করার জন্য
//       }
//     } catch (error) {
//       toast.error("Failed to add review");
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="bg-white p-8 rounded-[2rem] border-2 border-dashed border-violet-100 space-y-4"
//     >
//       <h3 className="text-xl font-black text-slate-900">
//         Share your experience
//       </h3>

//       <div className="flex gap-2">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <button
//             key={star}
//             type="button"
//             onClick={() => setRating(star)}
//             onMouseEnter={() => setHover(star)}
//             onMouseLeave={() => setHover(0)}
//           >
//             <Star
//               className={`w-8 h-8 transition-colors ${star <= (hover || rating) ? "fill-amber-400 text-amber-400" : "text-slate-200"}`}
//             />
//           </button>
//         ))}
//       </div>

//       <Textarea
//         {...register("comment")}
//         placeholder="How was the session?"
//         className="rounded-2xl border-slate-100 focus:border-violet-500 min-h-[100px]"
//       />

//       <Button
//         disabled={isSubmitting}
//         className="w-full rounded-2xl bg-violet-600 h-12 font-bold"
//       >
//         {isSubmitting ? (
//           <Loader2 className="animate-spin" />
//         ) : (
//           "Post Review Now"
//         )}
//       </Button>
//     </form>
//   );
// };
