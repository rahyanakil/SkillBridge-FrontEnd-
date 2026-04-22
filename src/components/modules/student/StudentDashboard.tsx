"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  cancelBooking,
  createPaymentCheckout,
  getClassroomLink,
  getCompletedCourses,
  getRecommendations,
  getStudentBookings,
  verifyPayment,
} from "@/services/Dashboard/studentActions";
import { getAllCourse } from "@/services/course";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  GraduationCap,
  Loader2,
  PlayCircle,
  Star,
  Trophy,
  Video,
  X,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-600",
  ACCEPTED: "bg-emerald-50 text-emerald-600",
  REJECTED: "bg-rose-50 text-rose-600",
  COMPLETED: "bg-blue-50 text-blue-600",
  CANCELLED: "bg-slate-100 text-slate-500",
};

interface Props {
  initialBookings: any[];
  initialCompleted: any[];
  initialRecommendations: any[];
  isFallbackRecs: boolean;
}

export default function StudentDashboard({
  initialBookings,
  initialCompleted,
  initialRecommendations,
  isFallbackRecs: initialIsFallback,
}: Props) {
  const [bookings, setBookings] = useState(initialBookings);
  const [completed, setCompleted] = useState(initialCompleted);
  const [recommendations, setRecommendations] = useState(initialRecommendations);
  const [isFallbackRecs, setIsFallbackRecs] = useState(initialIsFallback);
  const [classroomLoading, setClassroomLoading] = useState<string | null>(null);
  const [paymentLoading, setPaymentLoading] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const [bookRes, compRes, recRes] = await Promise.all([
      getStudentBookings(),
      getCompletedCourses(),
      getRecommendations(),
    ]);
    setBookings(Array.isArray(bookRes?.data) ? bookRes.data : []);
    setCompleted(Array.isArray(compRes?.data) ? compRes.data : []);
    const recs = Array.isArray(recRes?.data) ? recRes.data : [];
    if (recs.length > 0) {
      setRecommendations(recs);
      setIsFallbackRecs(false);
    } else {
      const popularRes = await getAllCourse();
      setRecommendations(Array.isArray(popularRes?.data) ? popularRes.data.slice(0, 6) : []);
      setIsFallbackRecs(true);
    }
  }, []);

  const handleCancel = async (bookingId: string) => {
    if (!confirm("Cancel this booking?")) return;
    const res = await cancelBooking(bookingId);
    if (res?.success) { toast.success("Booking cancelled"); refresh(); }
    else toast.error(res?.message || "Cancel failed");
  };

  const handleClassroom = async (bookingId: string) => {
    setClassroomLoading(bookingId);
    const res = await getClassroomLink(bookingId);
    setClassroomLoading(null);
    if (res?.success) window.open(res.data.classroomLink, "_blank");
    else toast.error(res?.message || "Failed to get classroom link");
  };

  const handlePay = async (bookingId: string) => {
    setPaymentLoading(bookingId);
    const checkout = await createPaymentCheckout(bookingId);
    if (!checkout?.success) { setPaymentLoading(null); return toast.error(checkout?.message); }
    const confirmed = confirm(`Confirm payment of $${checkout.data.amount} for "${checkout.data.courseTitle}"?`);
    if (!confirmed) { setPaymentLoading(null); return; }
    const verify = await verifyPayment(bookingId);
    setPaymentLoading(null);
    if (verify?.success) { toast.success("Payment successful!"); refresh(); }
    else toast.error(verify?.message || "Payment failed");
  };

  const stats = useMemo(() => [
    { title: "Total Bookings", value: bookings.length.toString().padStart(2, "0"), icon: GraduationCap, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Pending", value: bookings.filter((b) => b.status === "PENDING").length.toString().padStart(2, "0"), icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
    { title: "Active", value: bookings.filter((b) => b.status === "ACCEPTED").length.toString().padStart(2, "0"), icon: PlayCircle, color: "text-violet-600", bg: "bg-violet-50" },
    { title: "Completed", value: completed.length.toString().padStart(2, "0"), icon: Trophy, color: "text-emerald-600", bg: "bg-emerald-50" },
  ], [bookings, completed]);

  const nextAccepted = bookings.find((b) => b.status === "ACCEPTED");

  return (
    <div className="p-8 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-7xl mx-auto">
      <div>
        <h1 className="text-5xl font-black text-slate-900 italic tracking-tight leading-none">
          Welcome Back, <span className="text-violet-600">Learner!</span>
        </h1>
        <p className="text-slate-500 font-medium mt-2">
          {bookings.filter((b) => b.status === "ACCEPTED").length} active sessions · {completed.length} completed
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm rounded-[2.5rem] bg-white group hover:shadow-xl transition-all duration-300 overflow-hidden">
            <CardContent className="p-8">
              <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} w-fit mb-4 group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.title}</h4>
              <p className="text-4xl font-black text-slate-900 mt-2 tracking-tighter">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <Card className="md:col-span-2 rounded-[3rem] border-none shadow-sm bg-white p-8">
          <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
            <Calendar className="text-violet-600 w-5 h-5" /> My Bookings
          </h3>
          <div className="space-y-3">
            {bookings.length > 0 ? bookings.map((booking) => (
              <div key={booking.id} className="p-5 bg-slate-50 rounded-[1.5rem] flex items-center justify-between group hover:bg-white hover:shadow-md transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm font-black text-violet-600">
                    {booking.course?.title?.[0] || "C"}
                  </div>
                  <div>
                    <p className="font-black text-slate-800">{booking.course?.title || "Course"}</p>
                    <p className="text-xs text-slate-400 font-medium">
                      {booking.tutor?.user?.name || "Tutor"} · {new Date(booking.date).toLocaleDateString()}
                    </p>
                    {booking.paymentStatus === "UNPAID" && booking.status !== "CANCELLED" && booking.status !== "REJECTED" && (
                      <span className="text-xs text-rose-500 font-bold">Payment pending</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`rounded-lg font-black text-[10px] ${STATUS_COLORS[booking.status] || "bg-slate-100 text-slate-500"}`}>
                    {booking.status}
                  </Badge>
                  {booking.status === "ACCEPTED" && booking.paymentStatus === "UNPAID" && (
                    <button onClick={() => handlePay(booking.id)} disabled={paymentLoading === booking.id} className="p-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors" title="Pay now">
                      {paymentLoading === booking.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <CreditCard className="w-3 h-3" />}
                    </button>
                  )}
                  {booking.status === "ACCEPTED" && (
                    <button onClick={() => handleClassroom(booking.id)} disabled={classroomLoading === booking.id} className="p-2 bg-violet-500 text-white rounded-xl hover:bg-violet-600 transition-colors" title="Enter classroom">
                      {classroomLoading === booking.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Video className="w-3 h-3" />}
                    </button>
                  )}
                  {["PENDING", "ACCEPTED"].includes(booking.status) && (
                    <button onClick={() => handleCancel(booking.id)} className="p-2 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-100 transition-colors" title="Cancel">
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            )) : (
              <p className="text-center py-12 text-slate-400 font-medium italic">No bookings yet. Browse courses to get started!</p>
            )}
          </div>
        </Card>

        <Card className="rounded-[3rem] border-none bg-slate-950 text-white p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
          <div className="relative z-10 space-y-4">
            <Badge className="bg-violet-600 border-none font-bold px-4 py-1.5 rounded-full">UPCOMING</Badge>
            <h2 className="text-3xl font-bold leading-tight tracking-tight">
              {nextAccepted?.course?.title || "Ready to Learn?"}
            </h2>
            <p className="text-slate-400 text-sm">{nextAccepted?.tutor?.user?.name || "Book a course to start"}</p>
          </div>
          {nextAccepted ? (
            <button onClick={() => handleClassroom(nextAccepted.id)} className="relative z-10 bg-white text-slate-950 w-full py-4 rounded-2xl font-black hover:scale-105 active:scale-95 transition-all mt-8 flex items-center justify-center gap-2">
              {classroomLoading === nextAccepted.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Video className="w-4 h-4" /> Enter Classroom</>}
            </button>
          ) : (
            <Link href="/courses">
              <button className="relative z-10 bg-violet-600 text-white w-full py-4 rounded-2xl font-black hover:scale-105 transition-all mt-8 flex items-center justify-center gap-2">
                Browse Courses <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          )}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-violet-600/30 rounded-full blur-[60px]" />
        </Card>
      </div>

      {completed.length > 0 && (
        <div>
          <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-emerald-500" /> Completed Courses
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {completed.map((b) => (
              <Card key={b.id} className="rounded-[2rem] border-none shadow-sm hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <h3 className="font-black text-slate-800 mb-1">{b.course?.title}</h3>
                  <p className="text-xs text-slate-500">{b.tutor?.user?.name} · {new Date(b.updatedAt).toLocaleDateString()}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <Badge className="bg-emerald-50 text-emerald-700 border-none text-xs">COMPLETED</Badge>
                    {b.review ? (
                      <span className="flex items-center gap-1 text-xs text-amber-500">
                        <Star className="w-3 h-3 fill-amber-400" /> {b.review.rating}
                      </span>
                    ) : (
                      <Link href={`/courses/${b.courseId}`} className="text-xs text-violet-600 font-bold hover:underline">Leave review</Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {recommendations.length > 0 && (
        <div>
          <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-violet-500" />
            {isFallbackRecs ? "Popular Courses" : "Recommended for You"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendations.map((course: any) => (
              <Link href={`/courses/${course.id}`} key={course.id}>
                <Card className="rounded-[2rem] border-none shadow-sm hover:shadow-xl transition-all cursor-pointer group">
                  <CardContent className="p-6">
                    <Badge className="bg-violet-50 text-violet-700 border-none text-xs mb-3">{course.category?.name}</Badge>
                    <h3 className="font-black text-slate-800 group-hover:text-violet-600 transition-colors">{course.title}</h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{course.description}</p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="flex items-center gap-1 text-xs text-amber-500">
                        <Star className="w-3 h-3 fill-amber-400" /> {course.avgRating}
                      </span>
                      <span className="font-black text-slate-900">${course.price}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
