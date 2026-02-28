"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BookingFormValues, bookingSchema } from "./booking.schema";

// ডামি কোর্স ডেটা (এটি আপনি API থেকে নিয়ে আসবেন)
const courses = [
  { id: "0aa3eecd-bc7f-440f-a3fc-ec69db776896", name: "Next.js Mastery" },
  { id: "1bb2ee-bc7f-440f-a3fc-ec69db776897", name: "Prisma & PostgreSQL" },
];

export function BookingModal() {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingFormValues) => {
    try {
      // এখানে আপনার API কল হবে (যেমন: createBooking(data))
      console.log("Booking Data:", data);

      // সিমুলেশন
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Booking created successfully!");
      reset();
      setOpen(false);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl px-6 font-bold shadow-lg shadow-violet-100">
          Book a Session
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] rounded-[2rem] border-none shadow-2xl p-0 overflow-hidden">
        {/* মোডাল হেডার উইথ গ্রেডিয়েন্ট */}
        <div className="bg-linear-to-r from-violet-600 to-indigo-600 p-8 text-white">
          <DialogTitle className="text-2xl font-black">
            Reserve Your Slot
          </DialogTitle>
          <DialogDescription className="text-violet-100 mt-2">
            Fill in the details below to schedule your course session with the
            tutor.
          </DialogDescription>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-5">
          {/* কোর্স সিলেকশন (Dropdown) */}
          <div className="space-y-2">
            <Label className="font-bold text-gray-700">Select Course</Label>
            <Select onValueChange={(value) => setValue("courseId", value)}>
              <SelectTrigger className="h-12 rounded-xl border-gray-100 bg-gray-50/50 focus:ring-violet-200">
                <SelectValue placeholder="Choose a course" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.courseId && (
              <p className="text-xs text-red-500 font-bold">
                {errors.courseId.message}
              </p>
            )}
          </div>

          {/* ডেট ফিল্ডস */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="font-bold text-gray-700">Start Date</Label>
              <div className="relative">
                <Input
                  type="datetime-local"
                  {...register("startDate")}
                  className="h-12 rounded-xl border-gray-100 bg-gray-50/50 pr-4"
                />
              </div>
              {errors.startDate && (
                <p className="text-xs text-red-500 font-bold">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="font-bold text-gray-700">End Date</Label>
              <Input
                type="datetime-local"
                {...register("endDate")}
                className="h-12 rounded-xl border-gray-100 bg-gray-50/50"
              />
              {errors.endDate && (
                <p className="text-xs text-red-500 font-bold">
                  {errors.endDate.message}
                </p>
              )}
            </div>
          </div>

          {/* নোটস */}
          <div className="space-y-2">
            <Label className="font-bold text-gray-700">
              Additional Notes (Optional)
            </Label>
            <Textarea
              {...register("notes")}
              placeholder="Any specific topics you want to cover?"
              className="rounded-xl border-gray-100 bg-gray-50/50 min-h-[100px] focus:ring-violet-200"
            />
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 rounded-2xl bg-violet-600 hover:bg-violet-700 text-lg font-bold shadow-xl shadow-violet-100 transition-all active:scale-95"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
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
