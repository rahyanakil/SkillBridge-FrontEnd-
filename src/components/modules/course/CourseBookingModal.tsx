"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, CheckCircle2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
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

const bookingSchema = z.object({
  courseId: z.string().min(1),
  startDate: z.string().min(1, "Please select a preferred date and time"),
  notes: z.string().optional(),
}).refine((data) => new Date(data.startDate) > new Date(), {
  message: "Session date must be in the future",
  path: ["startDate"],
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
  const router = useRouter();

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
    });

    if (res?.success) {
      toast.success("Booking created! Redirecting to payment…");
      reset();
      setOpen(false);
      router.push(`/checkout/${res.data.id}`);
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

      <DialogContent className="sm:max-w-md rounded-[2rem] border-none p-0 overflow-hidden bg-white shadow-2xl">
        <div className="bg-gradient-to-r from-violet-600 to-indigo-700 p-8 text-white">
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
          <div className="space-y-2">
            <Label className="font-bold text-gray-700">Preferred Date & Time</Label>
            <Input
              type="datetime-local"
              {...register("startDate")}
              className="rounded-xl border-gray-100 h-12"
            />
            {errors.startDate && (
              <p className="text-[10px] text-red-500 font-bold">
                {errors.startDate.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="font-bold text-gray-700">Notes (Optional)</Label>
            <Textarea
              {...register("notes")}
              placeholder="What do you want to learn from this session?"
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
                <span className="flex items-center gap-2">
                  Confirm Booking <CheckCircle2 className="w-5 h-5" />
                </span>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
