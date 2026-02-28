"use client";

import { Badge } from "@/components/ui/badge"; // Shadcn UI Badge
import { Card, CardContent } from "@/components/ui/card";
import {
  Activity,
  AlertCircle,
  DollarSign,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react"; // Lucide Icons

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Users",
      value: "2.4k",
      description: "+180 since last month",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Active Bookings",
      value: "412",
      description: "24 currently live",
      icon: Activity,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
    {
      title: "Total Revenue",
      value: "$12,840",
      description: "+12.5% increase",
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500">
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">
            System <span className="text-violet-600">Control</span>
          </h1>
          <p className="text-slate-500 font-medium">
            Platform-wide overview and analytics.
          </p>
        </div>

        <Badge
          variant="outline"
          className="rounded-full border-emerald-200 bg-emerald-50 text-emerald-700 font-bold px-4 py-1 flex items-center gap-2"
        >
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          System Online
        </Badge>
      </div>

      {/* --- Quick Stats Grid --- */}
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="border-none shadow-xl shadow-slate-100 rounded-[2.5rem] overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
          >
            <CardContent className="p-8">
              <div className="flex justify-between items-start">
                <div
                  className={`p-4 rounded-2xl ${stat.bg} ${stat.color} transition-colors group-hover:bg-slate-900 group-hover:text-white`}
                >
                  <stat.icon className="w-6 h-6" />
                </div>
                <TrendingUp className="w-5 h-5 text-slate-300" />
              </div>
              <div className="mt-6">
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                  {stat.title}
                </h4>
                <div className="flex items-baseline gap-2">
                  <p className="text-4xl font-black text-slate-900">
                    {stat.value}
                  </p>
                  <span className="text-xs font-bold text-emerald-500">
                    {stat.description.split(" ")[0]}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 font-medium">
                  {stat.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* --- Bottom Grid Section --- */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* System Health Card */}
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-slate-900 text-white p-8 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="w-8 h-8 text-violet-400" />
              <h3 className="text-xl font-bold">Security Status</h3>
            </div>
            <p className="text-slate-400 text-sm mb-6 max-w-sm">
              All systems are functioning normally. SSL certificates are up to
              date and firewall is active.
            </p>
            <div className="flex gap-4">
              <div className="bg-white/10 px-4 py-2 rounded-xl text-xs font-bold">
                Uptime: 99.9%
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-xl text-xs font-bold">
                Errors: 0
              </div>
            </div>
          </div>
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-violet-600/20 rounded-full blur-3xl" />
        </Card>

        {/* Alerts Card */}
        <Card className="rounded-[2.5rem] border-2 border-dashed border-slate-200 bg-white p-8">
          <div className="flex items-center gap-2 mb-6">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            <h3 className="text-xl font-bold text-slate-800">
              Pending Actions
            </h3>
          </div>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-xs font-bold text-slate-400">
                    ID
                  </div>
                  <p className="text-sm font-bold text-slate-700">
                    New tutor verification request
                  </p>
                </div>
                <Badge className="bg-slate-200 text-slate-600 hover:bg-slate-300 transition-colors cursor-pointer">
                  Review
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
