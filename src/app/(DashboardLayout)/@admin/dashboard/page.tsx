/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { deleteUser, getAllUsers } from "@/services/Dashboard/adminActions";
import {
  Download,
  Filter,
  MoreVertical,
  Search,
  ShieldCheck,
  UserCheck,
  UserMinus,
  Users,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export default function SeniorAdminDashboard() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Token safety check
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const initDashboard = useCallback(async () => {
    if (!token) {
      console.warn("Admin Token missing from localStorage");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await getAllUsers(token);

      // ✅ Handle different API response structures
      if (res?.success) {
        // যদি ডাটা সরাসরি res.data তে থাকে অথবা res.data.users এ থাকে
        const userList = Array.isArray(res.data)
          ? res.data
          : res.data?.users || [];
        setData(userList);
      } else {
        toast.error(res?.message || "Failed to fetch users");
      }
    } catch (err) {
      console.error("Dashboard Load Error:", err);
      toast.error("Network error: Could not sync with server");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    initDashboard();
  }, [initDashboard]);

  const stats = useMemo(
    () => ({
      total: data.length,
      tutors: data.filter((u) => u.role === "TUTOR").length,
      students: data.filter((u) => u.role === "STUDENT").length,
      admins: data.filter((u) => u.role === "ADMIN").length,
    }),
    [data],
  );

  const filteredData = useMemo(() => {
    return data.filter(
      (u) =>
        u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [data, searchQuery]);

  const handleAction = async (
    action: () => Promise<any>,
    successMsg: string,
  ) => {
    try {
      const res = await action();
      if (res.success) {
        toast.success(successMsg);
        initDashboard();
      } else {
        toast.error(res.message || "Action failed");
      }
    } catch (error) {
      toast.error("Operation failed");
    }
  };

  return (
    // ✅ Fix: changed max-w-400 to max-w-[1400px]
    <div className="p-8 space-y-10 max-w-350 mx-auto bg-[#fcfcfd] min-h-screen">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight italic">
            System <span className="text-violet-600">Control</span>
          </h2>
          <p className="text-slate-500 font-medium">
            Core platform oversight and user authorization.
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="rounded-xl font-bold bg-white border-slate-200"
          >
            <Download className="w-4 h-4 mr-2" /> Export
          </Button>
          <Button className="rounded-xl font-bold bg-violet-600 hover:bg-violet-700 shadow-lg shadow-violet-200">
            System Audit
          </Button>
        </div>
      </div>

      {/* 2. Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center md:text-left">
        {[
          {
            label: "Total Users",
            val: stats.total,
            icon: Users,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "Active Tutors",
            val: stats.tutors,
            icon: UserCheck,
            color: "text-amber-600",
            bg: "bg-amber-50",
          },
          {
            label: "Active Students",
            val: stats.students,
            icon: ShieldCheck,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
          },
          {
            label: "Admins",
            val: stats.admins,
            icon: ShieldCheck,
            color: "text-rose-600",
            bg: "bg-rose-50",
          },
        ].map((item, i) => (
          <Card
            key={i}
            className="border-none shadow-sm rounded-2xl bg-white overflow-hidden group hover:scale-[1.02] transition-transform"
          >
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                  {item.label}
                </p>
                <h3 className="text-3xl font-black text-slate-900">
                  {item.val}
                </h3>
              </div>
              <div className={`p-4 rounded-xl ${item.bg} ${item.color}`}>
                <item.icon className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 3. Table Section */}
      <Card className="rounded-[2rem] border-none shadow-sm bg-white overflow-hidden">
        <CardHeader className="p-8 pb-4 flex flex-col md:flex-row items-center justify-between gap-4 space-y-0">
          <CardTitle className="text-xl font-bold text-slate-800">
            User Registry
          </CardTitle>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                className="bg-slate-50 border-none rounded-xl pl-10 h-11 focus-visible:ring-violet-500"
                placeholder="Lookup name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl bg-slate-50 border-none"
            >
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/50 border-y border-slate-100">
              <tr className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                <th className="px-8 py-5">Entity</th>
                <th className="px-8 py-5">Role</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={4} className="h-20 bg-slate-50/20" />
                    </tr>
                  ))
              ) : filteredData.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-20 text-slate-400 font-bold uppercase tracking-tighter"
                  >
                    No records found
                  </td>
                </tr>
              ) : (
                filteredData.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50/30 transition-colors group"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center font-bold">
                          {user.name?.charAt(0) || "U"}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 leading-none mb-1">
                            {user.name}
                          </h4>
                          <p className="text-xs text-slate-400 font-medium">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <Badge
                        className={`rounded-lg px-2.5 py-1 font-bold text-[10px] shadow-none border-none
                        ${user.role === "ADMIN" ? "bg-rose-100 text-rose-700" : "bg-blue-100 text-blue-700"}`}
                      >
                        {user.role}
                      </Badge>
                    </td>
                    <td className="px-8 py-5 text-sm">
                      <span className="flex items-center gap-1.5 font-bold text-emerald-600 uppercase text-[10px]">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />{" "}
                        Active
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="rounded-xl w-48 p-2 border-slate-100 shadow-xl"
                        >
                          <DropdownMenuItem className="rounded-lg font-medium py-2">
                            Profile Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="rounded-lg font-medium py-2 text-rose-600 focus:bg-rose-50 focus:text-rose-600"
                            onClick={() =>
                              handleAction(
                                () => deleteUser(user.id, token!),
                                "Account Purged",
                              )
                            }
                          >
                            <UserMinus className="w-4 h-4 mr-2" /> Delete Access
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
