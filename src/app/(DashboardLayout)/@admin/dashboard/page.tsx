/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { deleteUser, getAllUsers } from "@/services/Dashboard/adminActions";
import Cookies from "js-cookie";
import { MoreVertical, Search, UserMinus, Users } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export default function SeniorAdminDashboard() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const initDashboard = useCallback(async () => {
    const token = Cookies.get("token");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await getAllUsers(token);

      // পোস্টম্যান রেসপন্স চেক: যদি success true হয় তবে ডাটা সেট হবে
      if (res?.success) {
        // ব্যাকএন্ড যদি সরাসরি res.data দেয় অথবা res.data.result দেয়
        const users = res.data?.result || res.data || [];
        setData(Array.isArray(users) ? users : []);
      } else {
        toast.error(res?.message || "Data fetch failed");
      }
    } catch (err) {
      toast.error("Network Error: Check API endpoint");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initDashboard();
  }, [initDashboard]);

  // ফিল্টারিং লজিক
  const filteredData = useMemo(() => {
    return data.filter(
      (u) =>
        u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [data, searchQuery]);

  const stats = useMemo(
    () => ({
      total: data.length,
      tutors: data.filter((u) => u.role === "TUTOR").length,
      students: data.filter((u) => u.role === "STUDENT").length,
    }),
    [data],
  );

  return (
    <div className="p-8 space-y-10 max-w-[1500px] mx-auto bg-[#f8fafc] min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-slate-900">Admin Control</h1>
          <p className="text-slate-500 font-medium italic">
            Data fetched from Postman-verified endpoints.
          </p>
        </div>
        <Button className="bg-violet-600 hover:bg-violet-700 rounded-xl px-8 font-bold shadow-lg">
          Add New User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            label: "Total Users",
            val: stats.total,
            color: "text-blue-600",
            bg: "bg-blue-100",
          },
          {
            label: "Active Tutors",
            val: stats.tutors,
            color: "text-amber-600",
            bg: "bg-amber-100",
          },
          {
            label: "Total Students",
            val: stats.students,
            color: "text-emerald-600",
            bg: "bg-emerald-100",
          },
        ].map((s, i) => (
          <Card key={i} className="border-none shadow-sm rounded-2xl">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">
                  {s.label}
                </p>
                <h3 className="text-3xl font-black">{s.val}</h3>
              </div>
              <div className={`p-4 rounded-xl ${s.bg} ${s.color}`}>
                <Users className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Registry Table */}
      <Card className="rounded-[2rem] border-none shadow-sm bg-white overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
          <CardTitle className="font-bold text-xl">User Registry</CardTitle>
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              className="pl-10 bg-slate-50 border-none rounded-xl"
              placeholder="Filter by name/email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/50">
              <tr className="text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
                <th className="px-8 py-5">User Identity</th>
                <th className="px-8 py-5">Role</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td
                    colSpan={3}
                    className="py-20 text-center animate-pulse font-bold text-slate-300"
                  >
                    Syncing with Backend...
                  </td>
                </tr>
              ) : (
                filteredData.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50/50 transition-all group"
                  >
                    <td className="px-8 py-5 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center font-bold">
                        {user.name?.[0]}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{user.name}</p>
                        <p className="text-xs text-slate-400">{user.email}</p>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <Badge className="rounded-lg shadow-none bg-blue-50 text-blue-600 border-none">
                        {user.role}
                      </Badge>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="rounded-xl p-2 border-slate-100"
                        >
                          <DropdownMenuItem
                            className="text-rose-600 font-bold focus:bg-rose-50"
                            onClick={() =>
                              deleteUser(user.id, Cookies.get("token")!)
                            }
                          >
                            <UserMinus className="w-4 h-4 mr-2" /> Delete
                            Identity
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
