/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  getTutorBookings,
  updateBookingStatus,
} from "@/services/Dashboard/tutorActions";
import Cookies from "js-cookie";
import {
  Check,
  DollarSign,
  Loader2,
  MessageSquare,
  Star,
  TrendingUp,
  Users,
  Video,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export default function TutorDashboard() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const initTutor = useCallback(async () => {
    const token = Cookies.get("token");
    if (!token) return;

    try {
      setLoading(true);
      const res = await getTutorBookings(token);
      if (res?.success) {
        setBookings(Array.isArray(res.data) ? res.data : []);
      }
    } catch (err) {
      toast.error("Failed to fetch tutor data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initTutor();
  }, [initTutor]);

  // স্ট্যাটাস হ্যান্ডলার
  const handleStatusChange = async (id: string, status: string) => {
    const token = Cookies.get("token");
    const res = await updateBookingStatus(id, status, token!);
    if (res.success) {
      toast.success(`Booking ${status.toLowerCase()} successfully!`);
      initTutor(); // রিফ্রেশ ডাটা
    } else {
      toast.error(res.message);
    }
  };

  const stats = useMemo(
    () => [
      {
        title: "Total Revenue",
        value: "$4,250",
        icon: DollarSign,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
      },
      {
        title: "Active Students",
        value: bookings.length.toString(),
        icon: Users,
        color: "text-blue-600",
        bg: "bg-blue-50",
      },
      {
        title: "Total Courses",
        value: "06",
        icon: Video,
        color: "text-violet-600",
        bg: "bg-violet-50",
      },
      {
        title: "Pending Requests",
        value: bookings.filter((b) => b.status === "PENDING").length.toString(),
        icon: MessageSquare,
        color: "text-amber-500",
        bg: "bg-amber-50",
      },
    ],
    [bookings],
  );

  if (loading)
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-600 mb-2" />
        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">
          Tutor Syncing...
        </p>
      </div>
    );

  return (
    <div className="p-6 space-y-8 animate-in fade-in zoom-in-95 duration-500">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-900 italic tracking-tight leading-none">
            Tutor <span className="text-emerald-600">Insights</span>
          </h1>
          <p className="text-slate-500 font-medium mt-2">
            Monitoring your teaching performance.
          </p>
        </div>
        <div className="hidden md:block">
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none px-6 py-2.5 font-black rounded-2xl shadow-sm italic">
            Withdraw Balance: $840.00
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card
            key={i}
            className="border-none shadow-xl shadow-slate-100/50 rounded-[2.5rem] group hover:bg-slate-900 transition-all duration-500 cursor-pointer"
          >
            <CardContent className="p-8">
              <div
                className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6 group-hover:bg-white/10 group-hover:text-white transition-all duration-500`}
              >
                <stat.icon className="w-7 h-7" />
              </div>
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                {stat.title}
              </h4>
              <div className="flex items-center justify-between mt-2">
                <p className="text-4xl font-black text-slate-900 group-hover:text-white transition-colors">
                  {stat.value}
                </p>
                <TrendingUp className="w-5 h-5 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Real-time Booking Requests */}
        <Card className="md:col-span-2 rounded-[3rem] border-none shadow-sm bg-white p-8 overflow-hidden">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black text-slate-800 tracking-tight">
              Student Session Requests
            </h3>
            <Badge className="bg-slate-100 text-slate-600 rounded-lg font-bold">
              Latest {bookings.length}
            </Badge>
          </div>

          <div className="space-y-4">
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-transparent hover:border-emerald-100 hover:bg-white hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-xl font-bold">
                      {booking.student?.name?.[0] || "S"}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-800">
                        {booking.student?.name || "Anonymous Student"}
                      </h4>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1 opacity-60">
                        Status:{" "}
                        <span
                          className={
                            booking.status === "ACCEPTED"
                              ? "text-emerald-600"
                              : "text-amber-500"
                          }
                        >
                          {booking.status}
                        </span>
                      </p>
                    </div>
                  </div>

                  {booking.status === "PENDING" ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleStatusChange(booking._id, "ACCEPTED")
                        }
                        className="h-12 w-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center hover:scale-110 transition-transform"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() =>
                          handleStatusChange(booking._id, "REJECTED")
                        }
                        className="h-12 w-12 bg-rose-500 text-white rounded-2xl flex items-center justify-center hover:scale-110 transition-transform"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <button className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-sm hover:bg-slate-900 hover:text-white transition-all">
                      <Video className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center py-20 font-bold text-slate-300 italic uppercase tracking-widest">
                No active requests found
              </p>
            )}
          </div>
        </Card>

        {/* Feedback Summary */}
        <Card className="rounded-[3rem] border-none bg-emerald-600 p-10 text-white relative overflow-hidden group shadow-2xl shadow-emerald-200">
          <div className="relative z-10">
            <h3 className="text-xl font-black mb-6 tracking-widest uppercase text-emerald-100">
              Performance
            </h3>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-7xl font-black tracking-tighter italic">
                4.9
              </span>
              <div className="space-y-1">
                <div className="flex text-amber-300">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-[10px] font-black opacity-70 uppercase tracking-widest block">
                  Top 1% Mentor
                </span>
              </div>
            </div>
            <p className="text-sm font-medium italic leading-relaxed opacity-90">
              &ldquo;The best explanation of TypeScript generics I&apos;ve ever
              seen. Highly recommended!&quot;
            </p>
            <button className="mt-10 w-full bg-slate-900 text-white py-5 rounded-[1.5rem] text-xs font-black uppercase tracking-widest hover:bg-white hover:text-emerald-600 transition-all shadow-xl">
              Reviews History
            </button>
          </div>
          <div className="absolute -right-16 -bottom-16 w-60 h-60 bg-white/10 rounded-full blur-[80px]" />
        </Card>
      </div>
    </div>
  );
}
