"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Calendar,
  GraduationCap,
  PlayCircle,
  Star,
  Trophy,
} from "lucide-react";

export default function StudentDashboard() {
  const stats = [
    {
      title: "Enrolled",
      value: "08",
      icon: GraduationCap,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "In Progress",
      value: "03",
      icon: PlayCircle,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
    {
      title: "Completed",
      value: "05",
      icon: Trophy,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Reviews",
      value: "12",
      icon: Star,
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl font-black text-slate-900 italic tracking-tight">
          Welcome Back, <span className="text-violet-600">Learner!</span>
        </h1>
        <p className="text-slate-500 font-medium">
          Ready to continue your journey today?
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card
            key={i}
            className="border-none shadow-xl shadow-slate-100/50 rounded-[2rem] overflow-hidden"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <Badge
                  variant="secondary"
                  className="rounded-full text-[10px] font-bold"
                >
                  Monthly
                </Badge>
              </div>
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                {stat.title}
              </h4>
              <p className="text-3xl font-black text-slate-900 mt-1">
                {stat.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom Layout */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Featured Card */}
        <Card className="md:col-span-2 rounded-[2.5rem] border-none bg-slate-900 text-white p-8 relative overflow-hidden flex flex-col justify-center min-h-62.5]">
          <div className="relative z-10 space-y-4">
            <Badge className="bg-violet-500 hover:bg-violet-600 border-none px-4 py-1">
              Up Next
            </Badge>
            <h2 className="text-3xl font-bold max-w-md leading-tight">
              Advanced React Patterns & Performance Optimization
            </h2>
            <div className="flex items-center gap-4 text-slate-400 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Today, 4:00 PM
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Module 4
              </div>
            </div>
            <button className="mt-4 bg-white text-slate-900 px-8 py-3 rounded-2xl font-black text-sm hover:bg-violet-400 hover:text-white transition-all">
              Join Session
            </button>
          </div>
          {/* Decorative Circle */}
          <div className="absolute -right-12 -top-12 w-64 h-64 bg-violet-600/20 rounded-full blur-3xl" />
        </Card>

        {/* Progress Card */}
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 flex flex-col items-center justify-center text-center">
          <div className="relative w-32 h-32 mb-6">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="58"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-slate-100"
              />
              <circle
                cx="64"
                cy="64"
                r="58"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray="364.4"
                strokeDashoffset="91"
                className="text-violet-600"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-slate-900">75%</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">
                Goal
              </span>
            </div>
          </div>
          <h3 className="font-bold text-slate-800">Weekly Target</h3>
          <p className="text-xs text-slate-400 mt-2 font-medium">
            You have completed 15 hours of study this week. 5 more to go!
          </p>
        </Card>
      </div>
    </div>
  );
}
