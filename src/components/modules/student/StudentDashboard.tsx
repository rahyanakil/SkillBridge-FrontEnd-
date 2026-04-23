"use client";

import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  cancelBooking, createPaymentCheckout, getClassroomLink,
  getCompletedCourses, getRecommendations, getStudentBookings, verifyPayment,
} from "@/services/Dashboard/studentActions";
import { getAllCourse } from "@/services/course";
import {
  ArrowRight, BookOpen, Calendar, CheckCircle, Clock, CreditCard,
  GraduationCap, Loader2, PlayCircle, Star, Trophy, Video, X, Zap,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700 border-amber-200",
  ACCEPTED: "bg-emerald-100 text-emerald-700 border-emerald-200",
  REJECTED: "bg-rose-100 text-rose-700 border-rose-200",
  COMPLETED: "bg-blue-100 text-blue-700 border-blue-200",
  CANCELLED: "bg-slate-100 text-slate-500 border-slate-200",
};

const STATUS_DOT: Record<string, string> = {
  PENDING: "bg-amber-400", ACCEPTED: "bg-emerald-400",
  REJECTED: "bg-rose-400", COMPLETED: "bg-blue-400", CANCELLED: "bg-slate-300",
};

const fadeUp = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45 } };

interface Props {
  initialBookings: any[];
  initialCompleted: any[];
  initialRecommendations: any[];
  isFallbackRecs: boolean;
}

export default function StudentDashboard({ initialBookings, initialCompleted, initialRecommendations, isFallbackRecs: initialIsFallback }: Props) {
  const [bookings, setBookings] = useState(initialBookings);
  const [completed, setCompleted] = useState(initialCompleted);
  const [recommendations, setRecommendations] = useState(initialRecommendations);
  const [isFallbackRecs, setIsFallbackRecs] = useState(initialIsFallback);
  const [classroomLoading, setClassroomLoading] = useState<string | null>(null);
  const [paymentLoading, setPaymentLoading] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const [bookRes, compRes, recRes] = await Promise.all([getStudentBookings(), getCompletedCourses(), getRecommendations()]);
    setBookings(Array.isArray(bookRes?.data) ? bookRes.data : []);
    setCompleted(Array.isArray(compRes?.data) ? compRes.data : []);
    const recs = Array.isArray(recRes?.data) ? recRes.data : [];
    if (recs.length > 0) { setRecommendations(recs); setIsFallbackRecs(false); }
    else {
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
    { title: "Total Bookings", value: bookings.length, icon: GraduationCap, gradient: "from-violet-500 to-indigo-600", light: "bg-violet-50", text: "text-violet-600" },
    { title: "Pending", value: bookings.filter((b) => b.status === "PENDING").length, icon: Clock, gradient: "from-amber-400 to-orange-500", light: "bg-amber-50", text: "text-amber-600" },
    { title: "Active", value: bookings.filter((b) => b.status === "ACCEPTED").length, icon: PlayCircle, gradient: "from-emerald-400 to-teal-500", light: "bg-emerald-50", text: "text-emerald-600" },
    { title: "Completed", value: completed.length, icon: Trophy, gradient: "from-blue-500 to-cyan-500", light: "bg-blue-50", text: "text-blue-600" },
  ], [bookings, completed]);

  const nextAccepted = bookings.find((b) => b.status === "ACCEPTED");

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div {...fadeUp}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-black text-violet-500 uppercase tracking-widest mb-1">Student Dashboard</p>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Welcome Back! <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">Keep Learning.</span>
            </h1>
            <p className="text-slate-500 font-medium mt-1.5 text-sm">
              {bookings.filter((b) => b.status === "ACCEPTED").length} active sessions · {completed.length} completed
            </p>
          </div>
          <Link href="/courses" className="hidden md:flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl font-black text-sm transition-all shadow-lg shadow-violet-200 active:scale-95">
            <Zap className="w-4 h-4" /> Browse Courses
          </Link>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <div className="group relative bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-xl hover:shadow-violet-50 transition-all duration-300 overflow-hidden cursor-default">
              <div className={`absolute inset-0 bg-gradient-to-br ${s.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              <div className={`${s.light} w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <s.icon className={`w-5 h-5 ${s.text}`} />
              </div>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{s.title}</p>
              <p className="text-3xl font-black text-slate-900 mt-1 tracking-tight">{String(s.value).padStart(2, "0")}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Bookings list */}
        <motion.div className="lg:col-span-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-violet-500" />
                <h3 className="font-black text-slate-900">My Bookings</h3>
              </div>
              <Badge className="bg-violet-50 text-violet-600 border-none font-bold">{bookings.length} total</Badge>
            </div>
            <div className="divide-y divide-slate-50 max-h-[420px] overflow-y-auto">
              <AnimatePresence>
                {bookings.length > 0 ? bookings.map((booking, i) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between p-4 hover:bg-slate-50/70 transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center font-black text-violet-600 text-sm shrink-0">
                        {booking.course?.title?.[0] || "C"}
                      </div>
                      <div className="min-w-0">
                        <p className="font-black text-slate-800 text-sm truncate">{booking.course?.title || "Course"}</p>
                        <p className="text-[11px] text-slate-400 font-medium truncate">
                          {booking.tutor?.user?.name} · {new Date(booking.date).toLocaleDateString()}
                        </p>
                        {booking.paymentStatus === "UNPAID" && !["CANCELLED","REJECTED"].includes(booking.status) && (
                          <span className="text-[10px] text-rose-500 font-bold">• Payment pending</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[10px] font-black uppercase tracking-wide shrink-0 hidden sm:flex">
                        <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[booking.status] || "bg-slate-300"}`} />
                        <span className={STATUS_COLORS[booking.status]?.split(" ")[1] || "text-slate-500"}>{booking.status}</span>
                      </div>
                      {booking.status === "ACCEPTED" && booking.paymentStatus === "UNPAID" && (
                        <button onClick={() => handlePay(booking.id)} disabled={paymentLoading === booking.id} className="p-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors" title="Pay now">
                          {paymentLoading === booking.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CreditCard className="w-3.5 h-3.5" />}
                        </button>
                      )}
                      {booking.status === "ACCEPTED" && (
                        <button onClick={() => handleClassroom(booking.id)} disabled={classroomLoading === booking.id} className="p-2 bg-violet-500 text-white rounded-xl hover:bg-violet-600 transition-colors" title="Enter classroom">
                          {classroomLoading === booking.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Video className="w-3.5 h-3.5" />}
                        </button>
                      )}
                      {["PENDING", "ACCEPTED"].includes(booking.status) && (
                        <button onClick={() => handleCancel(booking.id)} className="p-2 bg-rose-50 text-rose-400 rounded-xl hover:bg-rose-100 transition-colors opacity-0 group-hover:opacity-100" title="Cancel">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                )) : (
                  <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                    <BookOpen className="w-10 h-10 mb-3 opacity-30" />
                    <p className="font-bold italic text-sm">No bookings yet</p>
                    <Link href="/courses" className="mt-3 text-violet-600 font-black text-xs hover:underline">Browse courses →</Link>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Next session card */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
          <div className="relative rounded-2xl overflow-hidden h-full min-h-[280px] flex flex-col"
            style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4c1d95 100%)" }}>
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-48 h-48 bg-violet-400/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-400/20 rounded-full blur-2xl" />
              <div className="absolute inset-0 opacity-5"
                style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
            </div>
            <div className="relative z-10 p-7 flex flex-col h-full">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/80 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest w-fit mb-5">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                {nextAccepted ? "Next Session" : "Get Started"}
              </div>
              <h2 className="text-xl font-black text-white leading-tight mb-2">
                {nextAccepted?.course?.title || "Ready to Learn?"}
              </h2>
              <p className="text-white/50 text-sm mb-auto">
                {nextAccepted ? `with ${nextAccepted.tutor?.user?.name}` : "Book your first course and start growing today."}
              </p>
              {nextAccepted ? (
                <button onClick={() => handleClassroom(nextAccepted.id)} className="mt-6 flex items-center justify-center gap-2 bg-white text-indigo-900 py-3.5 rounded-xl font-black hover:bg-violet-50 transition-all active:scale-95 shadow-xl">
                  {classroomLoading === nextAccepted.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Video className="w-4 h-4" /> Enter Classroom</>}
                </button>
              ) : (
                <Link href="/courses" className="mt-6 flex items-center justify-center gap-2 bg-violet-500 hover:bg-violet-400 text-white py-3.5 rounded-xl font-black transition-all active:scale-95">
                  Explore Courses <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Completed courses */}
      {completed.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-emerald-500" />
            <h2 className="text-lg font-black text-slate-900">Completed Courses</h2>
            <Badge className="bg-emerald-50 text-emerald-600 border-none text-xs font-bold">{completed.length}</Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {completed.map((b, i) => (
              <motion.div key={b.id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  </div>
                  <Badge className="bg-emerald-50 text-emerald-700 border-none text-[10px] font-black">DONE</Badge>
                </div>
                <h3 className="font-black text-slate-800 text-sm mb-0.5 line-clamp-1">{b.course?.title}</h3>
                <p className="text-[11px] text-slate-400">{b.tutor?.user?.name} · {new Date(b.updatedAt).toLocaleDateString()}</p>
                <div className="mt-3 pt-3 border-t border-slate-50 flex items-center justify-between">
                  {b.review ? (
                    <span className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> {b.review.rating} stars
                    </span>
                  ) : (
                    <Link href={`/courses/${b.courseId}`} className="text-xs text-violet-600 font-black hover:underline flex items-center gap-1">
                      Leave review <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-violet-500" />
            <h2 className="text-lg font-black text-slate-900">
              {isFallbackRecs ? "Popular Courses" : "Recommended For You"}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendations.map((course: any, i: number) => (
              <motion.div key={course.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                <Link href={`/courses/${course.id}`} className="block group">
                  <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-xl hover:border-violet-100 transition-all duration-300 group-hover:-translate-y-1">
                    <Badge className="bg-violet-50 text-violet-700 border-none text-[10px] font-black mb-3">{course.category?.name}</Badge>
                    <h3 className="font-black text-slate-800 group-hover:text-violet-600 transition-colors text-sm line-clamp-2 mb-1">{course.title}</h3>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mb-4">{course.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                        <Star className="w-3 h-3 fill-amber-400" /> {course.avgRating || "New"}
                      </span>
                      <span className="font-black text-slate-900">${course.price}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
