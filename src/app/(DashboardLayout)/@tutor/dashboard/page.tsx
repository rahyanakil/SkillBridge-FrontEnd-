"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowUpRight,
  DollarSign,
  MessageSquare,
  Star,
  TrendingUp,
  Users,
  Video,
} from "lucide-react";

export default function TutorDashboard() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$4,250",
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Active Students",
      value: "154",
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
      title: "Avg. Rating",
      value: "4.9",
      icon: MessageSquare,
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="p-6 space-y-8 animate-in fade-in zoom-in-95 duration-500">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-900 italic tracking-tight">
            Tutor <span className="text-emerald-600">Insights</span>
          </h1>
          <p className="text-slate-500 font-medium">
            Monitoring your teaching performance.
          </p>
        </div>
        <div className="hidden md:block">
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none px-4 py-2 font-bold rounded-xl">
            Withdraw Balance: $840.00
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card
            key={i}
            className="border-none shadow-xl shadow-slate-100/50 rounded-[2rem] group hover:bg-slate-900 transition-all duration-300"
          >
            <CardContent className="p-8">
              <div
                className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6 group-hover:bg-white/10 group-hover:text-white transition-colors`}
              >
                <stat.icon className="w-6 h-6" />
              </div>
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                {stat.title}
              </h4>
              <div className="flex items-center justify-between mt-2">
                <p className="text-3xl font-black text-slate-900 group-hover:text-white">
                  {stat.value}
                </p>
                <TrendingUp className="w-5 h-5 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Upcoming Classes */}
        <Card className="md:col-span-2 rounded-[2.5rem] border-none shadow-sm bg-white p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-slate-800">
              Next Scheduled Classes
            </h3>
            <button className="text-sm font-bold text-violet-600 flex items-center gap-1 hover:underline">
              View Calendar <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-5 bg-slate-50 rounded-[2rem] border border-transparent hover:border-violet-100 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex flex-col items-center justify-center leading-none">
                    <span className="text-[10px] font-black text-slate-400 uppercase">
                      Feb
                    </span>
                    <span className="text-lg font-black text-slate-800">
                      {27 + i}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 group-hover:text-violet-600 transition-colors">
                      Mastering TypeScript Advanced Types
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 font-medium">
                      10:00 AM - 12:00 PM • 42 Students
                    </p>
                  </div>
                </div>
                <button className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-sm hover:bg-slate-900 hover:text-white transition-all">
                  <Video className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </Card>

        {/* Student Feedback Summary */}
        <Card className="rounded-[2.5rem] border-none bg-emerald-600 p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-4">Student Feedback</h3>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-5xl font-black">4.9</span>
              <div className="flex flex-col">
                <div className="flex text-amber-300">
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                </div>
                <span className="text-[10px] font-bold opacity-80 uppercase tracking-tighter">
                  Based on 120 reviews
                </span>
              </div>
            </div>
            <p className="text-sm opacity-90 italic leading-relaxed">
              Great teaching style! The concepts were explained very clearly
              with real-world examples.
            </p>
            <button className="mt-8 w-full bg-white/10 hover:bg-white/20 border border-white/20 py-3 rounded-2xl text-xs font-bold transition-all">
              Read All Reviews
            </button>
          </div>
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        </Card>
      </div>
    </div>
  );
}
