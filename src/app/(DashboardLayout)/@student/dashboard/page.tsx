/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getStudentBookings } from "@/services/Dashboard/studentActions";
import Cookies from "js-cookie";
import {
  ArrowRight,
  Calendar,
  Clock,
  GraduationCap,
  Loader2,
  PlayCircle,
  Trophy,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export default function StudentDashboard() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const initDashboard = useCallback(async () => {
    const token = Cookies.get("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await getStudentBookings(token);

      if (res?.success) {
        // ব্যাকএন্ড যদি { success: true, data: [...] } দেয়
        setBookings(Array.isArray(res.data) ? res.data : []);
      } else {
        toast.error(res?.message || "Failed to sync bookings");
      }
    } catch (err) {
      toast.error("Network Error: Could not connect to server");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initDashboard();
  }, [initDashboard]);

  // ডাইনামিক ক্যালকুলেশন
  const stats = useMemo(
    () => [
      {
        title: "Total Bookings",
        value: bookings.length.toString().padStart(2, "0"),
        icon: GraduationCap,
        color: "text-blue-600",
        bg: "bg-blue-50",
      },
      {
        title: "Pending",
        value: bookings
          .filter((b) => b.status === "PENDING")
          .length.toString()
          .padStart(2, "0"),
        icon: Clock,
        color: "text-amber-600",
        bg: "bg-amber-50",
      },
      {
        title: "Accepted",
        value: bookings
          .filter((b) => b.status === "ACCEPTED")
          .length.toString()
          .padStart(2, "0"),
        icon: PlayCircle,
        color: "text-violet-600",
        bg: "bg-violet-50",
      },
      {
        title: "Completed",
        value: bookings
          .filter((b) => b.status === "COMPLETED")
          .length.toString()
          .padStart(2, "0"),
        icon: Trophy,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
      },
    ],
    [bookings],
  );

  if (loading)
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-violet-600 mb-2" />
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
          Hydrating Dashboard...
        </p>
      </div>
    );

  return (
    <div className="p-8 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-350 mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-5xl font-black text-slate-900 italic tracking-tight leading-none">
          Welcome Back, <span className="text-violet-600">Learner!</span>
        </h1>
        <p className="text-slate-500 font-medium mt-2">
          You have {bookings.filter((b) => b.status === "ACCEPTED").length}{" "}
          active sessions scheduled.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card
            key={i}
            className="border-none shadow-sm rounded-[2.5rem] bg-white group hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}
                >
                  <stat.icon className="w-6 h-6" />
                </div>
                <Badge
                  variant="secondary"
                  className="rounded-full text-[10px] font-black px-3 py-1"
                >
                  REALTIME
                </Badge>
              </div>
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">
                {stat.title}
              </h4>
              <p className="text-4xl font-black text-slate-900 mt-2 tracking-tighter">
                {stat.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Booking List Table/Section */}
      <div className="grid gap-8 md:grid-cols-3">
        <Card className="md:col-span-2 rounded-[3rem] border-none shadow-sm bg-white p-8 overflow-hidden border border-slate-50">
          <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
            <Calendar className="text-violet-600 w-5 h-5" /> My Recent Bookings
          </h3>
          <div className="space-y-4">
            {bookings.length > 0 ? (
              bookings.slice(0, 5).map((booking) => (
                <div
                  key={booking._id}
                  className="p-5 bg-slate-50 rounded-[1.5rem] flex items-center justify-between hover:bg-slate-100/80 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm font-bold text-violet-600">
                      {booking.status === "ACCEPTED" ? "✅" : "⏳"}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">
                        {booking.tutor?.name || "Private Tutor Session"}
                      </p>
                      <p className="text-xs text-slate-400 font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" />{" "}
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge
                    className={`rounded-lg font-black text-[10px] ${booking.status === "ACCEPTED" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}
                  >
                    {booking.status}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-400 font-medium italic">
                  No bookings found in your history.
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Next Class Hero */}
        <Card className="rounded-[3rem] border-none bg-slate-950 text-white p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
          <div className="relative z-10 space-y-4">
            <Badge className="bg-violet-600 border-none font-bold px-4 py-1.5 rounded-full">
              UPCOMING
            </Badge>
            <h2 className="text-3xl font-bold leading-tight tracking-tight group-hover:text-violet-200 transition-colors">
              {bookings.find((b) => b.status === "ACCEPTED")?.tutor?.name ||
                "Ready to Learn?"}
            </h2>
            <p className="text-slate-400 text-sm font-medium">
              Join your mentor for an interactive session.
            </p>
          </div>
          <button className="relative z-10 bg-white text-slate-950 w-full py-4 rounded-2xl font-black hover:scale-105 active:scale-95 transition-all mt-8 flex items-center justify-center gap-2">
            Enter Classroom <ArrowRight className="w-4 h-4" />
          </button>
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-violet-600/30 rounded-full blur-[60px]" />
        </Card>
      </div>
    </div>
  );
}
