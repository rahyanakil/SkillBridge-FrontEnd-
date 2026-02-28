"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createBooking } from "@/services/booking";
// import { createBooking } from "@/services/bookingActions";

// ভ্যালিডেশন স্কিমা আপডেট করা হয়েছে
const bookingSchema = z
  .object({
    courseId: z.string().min(1),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    notes: z.string().optional(),
  })
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: "End date must be after start date",
    path: ["endDate"],
  });

type BookingFormValues = z.infer<typeof bookingSchema>;

export function CourseBookingModal({
  currentCourseId,
  courseTitle,
}: {
  currentCourseId: string;
  courseTitle: string;
}) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { courseId: currentCourseId },
  });

  const onSubmit = async (data: BookingFormValues) => {
    const res = await createBooking({
      courseId: data.courseId,
      startDate: data.startDate,
      endDate: data.endDate,
    });

    if (res?.success) {
      toast.success("Booking successful!");
      reset();
      setOpen(false);
    } else {
      toast.error(res?.message || "Booking failed!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full py-8 text-xl font-black rounded-2xl bg-violet-600 hover:bg-violet-700 shadow-xl uppercase transition-all active:scale-95">
          Book a Session
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-125 rounded-[2rem] border-none p-0 overflow-hidden bg-white shadow-2xl">
        <div className="bg-linear-to-r from-violet-600 to-indigo-700 p-8 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-6 h-6" />
            <DialogTitle className="text-2xl font-bold">
              Schedule Session
            </DialogTitle>
          </div>
          <DialogDescription className="text-violet-100 italic">
            Course: {courseTitle}
          </DialogDescription>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-bold text-gray-700">Start Date</Label>
              <Input
                type="datetime-local"
                {...register("startDate")}
                className="rounded-xl border-gray-100"
              />
              {errors.startDate && (
                <p className="text-[10px] text-red-500 font-bold">
                  {errors.startDate.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label className="font-bold text-gray-700">End Date</Label>
              <Input
                type="datetime-local"
                {...register("endDate")}
                className="rounded-xl border-gray-100"
              />
              {errors.endDate && (
                <p className="text-[10px] text-red-500 font-bold">
                  {errors.endDate.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-bold text-gray-700">Notes (Optional)</Label>
            <Textarea
              {...register("notes")}
              placeholder="Anything else?"
              className="rounded-xl border-gray-100 min-h-20"
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 rounded-2xl bg-violet-600 font-bold text-lg"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Confirm Booking"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { Calendar, CheckCircle2, Loader2 } from "lucide-react";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import * as z from "zod";

// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { createBooking } from "@/services/booking";
// // import { createBooking } from "@/services/bookingActions"; // আপনার সঠিক পাথ দিন

// // ভ্যালিডেশন স্কিমা
// const bookingSchema = z.object({
//   courseId: z.string().min(1),
//   startDate: z.string().min(1, "Please select a preferred date and time"),
//   notes: z.string().optional(),
// });

// type BookingFormValues = z.infer<typeof bookingSchema>;

// interface IProps {
//   currentCourseId: string;
//   courseTitle: string;
// }

// export function CourseBookingModal({ currentCourseId, courseTitle }: IProps) {
//   const [open, setOpen] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors, isSubmitting },
//   } = useForm<BookingFormValues>({
//     resolver: zodResolver(bookingSchema),
//     defaultValues: {
//       courseId: currentCourseId,
//     },
//   });

//   const onSubmit = async (data: BookingFormValues) => {
//     // আপনার ব্যাকএন্ড সার্ভিস payload.schedule এক্সপেক্ট করে
//     const payload = {
//       courseId: data.courseId,
//       schedule: data.startDate,
//     };

//     const res = await createBooking(payload);

//     if (res?.success) {
//       toast.success("Booking request successful!");
//       reset();
//       setOpen(false);
//     } else {
//       // ব্যাকএন্ডের এরর মেসেজ (যেমন: "You can't book your own course!") এখানে দেখাবে
//       toast.error(res?.message || "Something went wrong!");
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button className="w-full py-8 text-xl font-black rounded-2xl bg-violet-600 hover:bg-violet-700 shadow-xl shadow-violet-100 transition-all hover:scale-[1.02] uppercase tracking-wide">
//           Book a Session
//         </Button>
//       </DialogTrigger>

//       <DialogContent className="sm:max-w-[480px] rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden bg-white">
//         <div className="bg-linear-to-br from-violet-600 to-indigo-700 p-8 text-white">
//           <div className="flex items-center gap-3 mb-2">
//             <div className="p-2 bg-white/20 rounded-lg">
//               <Calendar className="w-6 h-6 text-white" />
//             </div>
//             <DialogTitle className="text-2xl font-black italic">
//               Reserve Your Slot
//             </DialogTitle>
//           </div>
//           <DialogDescription className="text-violet-100 mt-2">
//             Schedule a session for:{" "}
//             <span className="font-bold text-white underline">
//               {courseTitle}
//             </span>
//           </DialogDescription>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
//           <div className="space-y-2">
//             <Label className="font-bold text-gray-700 ml-1">
//               Preferred Date & Time
//             </Label>
//             <Input
//               type="datetime-local"
//               {...register("startDate")}
//               className="h-12 rounded-xl border-gray-100 bg-gray-50/50 focus:ring-2 focus:ring-violet-500 transition-all font-medium"
//             />
//             {errors.startDate && (
//               <p className="text-[11px] text-red-500 font-bold ml-1">
//                 {errors.startDate.message}
//               </p>
//             )}
//           </div>

//           <div className="space-y-2">
//             <Label className="font-bold text-gray-700 ml-1">
//               Additional Notes
//             </Label>
//             <Textarea
//               {...register("notes")}
//               placeholder="What do you want to learn from this session?"
//               className="rounded-xl border-gray-100 bg-gray-50/50 min-h-[100px] focus:ring-2 focus:ring-violet-200"
//             />
//           </div>

//           <DialogFooter className="pt-2">
//             <Button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full h-14 rounded-2xl bg-violet-600 hover:bg-violet-700 text-lg font-bold shadow-xl shadow-violet-100 transition-all active:scale-95"
//             >
//               {isSubmitting ? (
//                 <div className="flex items-center gap-2">
//                   <Loader2 className="w-5 h-5 animate-spin" /> Processing...
//                 </div>
//               ) : (
//                 <span className="flex items-center gap-2">
//                   Confirm Reservation <CheckCircle2 className="w-5 h-5" />
//                 </span>
//               )}
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }
