"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  adminCreateCategory,
  adminDeleteCategory,
  adminDeleteCourse,
  adminUpdateBookingStatus,
  deleteUser,
  getAdminBookings,
  getAdminStats,
  getAllUsers,
  updateUserBanStatus,
} from "@/services/Dashboard/adminActions";
import { getAllCategories } from "@/services/category/CategoryAction";
import {
  BookOpen,
  Check,
  DollarSign,
  Folder,
  Loader2,
  MoreVertical,
  Plus,
  Search,
  Shield,
  Star,
  Trash2,
  TrendingUp,
  UserMinus,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Tab = "users" | "bookings" | "categories";

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-600",
  ACCEPTED: "bg-emerald-50 text-emerald-600",
  REJECTED: "bg-rose-50 text-rose-600",
  COMPLETED: "bg-blue-50 text-blue-600",
  CANCELLED: "bg-slate-100 text-slate-500",
};

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("users");
  const [users, setUsers] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [bookingSearch, setBookingSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const categoryForm = useForm<{ name: string; description: string }>();

  const load = useCallback(async () => {
    setLoading(true);
    const [usersRes, statsRes, bookingsRes, catRes] = await Promise.all([
      getAllUsers(),
      getAdminStats(),
      getAdminBookings(),
      getAllCategories(),
    ]);
    if (usersRes?.success) setUsers(Array.isArray(usersRes.data) ? usersRes.data : []);
    if (statsRes?.success) setStats(statsRes.data);
    setBookings(Array.isArray(bookingsRes?.data) ? bookingsRes.data : []);
    setCategories(Array.isArray(catRes) ? catRes : (Array.isArray(catRes?.data) ? catRes.data : []));
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const filteredUsers = useMemo(() =>
    users.filter((u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()),
    ), [users, search]);

  const filteredBookings = useMemo(() => {
    let list = bookings;
    if (statusFilter !== "ALL") list = list.filter((b) => b.status === statusFilter);
    if (bookingSearch) list = list.filter((b) =>
      b.student?.name?.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.course?.title?.toLowerCase().includes(bookingSearch.toLowerCase()),
    );
    return list;
  }, [bookings, statusFilter, bookingSearch]);

  const handleDelete = async (userId: string, name: string) => {
    if (!confirm(`Delete user "${name}"? This cannot be undone.`)) return;
    const res = await deleteUser(userId);
    if (res?.success) { toast.success("User deleted"); load(); }
    else toast.error(res?.message || "Delete failed");
  };

  const handleBan = async (userId: string, isBanned: boolean) => {
    const res = await updateUserBanStatus(userId, !isBanned);
    if (res?.success) { toast.success(isBanned ? "User unbanned" : "User banned"); load(); }
    else toast.error(res?.message || "Update failed");
  };

  const handleBookingStatus = async (bookingId: string, status: string) => {
    const res = await adminUpdateBookingStatus(bookingId, status);
    if (res?.success) { toast.success(`Booking marked as ${status}`); load(); }
    else toast.error(res?.message || "Update failed");
  };

  const handleDeleteCourse = async (courseId: string, title: string) => {
    if (!confirm(`Delete course "${title}"?`)) return;
    const res = await adminDeleteCourse(courseId);
    if (res?.success) { toast.success("Course deleted"); load(); }
    else toast.error(res?.message || "Delete failed");
  };

  const handleCreateCategory = async (data: any) => {
    const res = await adminCreateCategory(data);
    if (res?.success) { toast.success("Category created!"); categoryForm.reset(); load(); }
    else toast.error(res?.message || "Failed to create category");
  };

  const handleDeleteCategory = async (id: string, name: string) => {
    if (!confirm(`Delete category "${name}"? This may affect courses using it.`)) return;
    const res = await adminDeleteCategory(id);
    if (res?.success) { toast.success("Category deleted"); load(); }
    else toast.error(res?.message || "Delete failed");
  };

  const statCards = [
    { label: "Total Users", val: stats?.totalUsers ?? users.length, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Tutors", val: stats?.totalTutors ?? 0, icon: UserPlus, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Total Students", val: stats?.totalStudents ?? 0, icon: BookOpen, color: "text-violet-600", bg: "bg-violet-50" },
    { label: "Total Bookings", val: stats?.totalBookings ?? bookings.length, icon: TrendingUp, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Total Revenue", val: `$${stats?.totalRevenue?.toFixed(2) ?? "0.00"}`, icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Avg Rating", val: stats?.avgRating ?? "—", icon: Star, color: "text-rose-600", bg: "bg-rose-50" },
  ];

  const tabs: { key: Tab; label: string; icon: any }[] = [
    { key: "users", label: "Users", icon: Users },
    { key: "bookings", label: "Bookings", icon: TrendingUp },
    { key: "categories", label: "Categories", icon: Folder },
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-slate-900 italic">Admin <span className="text-violet-600">Control</span></h1>
          <p className="text-slate-500 font-medium mt-1">Platform overview & management</p>
        </div>
        <Shield className="w-10 h-10 text-violet-200" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((s, i) => (
          <Card key={i} className="border-none shadow-sm rounded-2xl">
            <CardContent className="p-5">
              <div className={`w-10 h-10 rounded-xl ${s.bg} ${s.color} flex items-center justify-center mb-3`}>
                <s.icon className="w-5 h-5" />
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{s.label}</p>
              <h3 className="text-2xl font-black text-slate-900 mt-0.5">{s.val}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-slate-100 pb-0">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-2 px-5 py-3 rounded-t-2xl font-black text-sm transition-all ${
              tab === t.key
                ? "bg-white text-violet-600 border-x border-t border-slate-100 -mb-px"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <t.icon className="w-4 h-4" />
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-violet-400" />
        </div>
      ) : (
        <>
          {/* ── USERS TAB ── */}
          {tab === "users" && (
            <Card className="rounded-[2rem] border-none shadow-sm bg-white overflow-hidden">
              <div className="p-6 border-b border-slate-50 flex justify-between items-center gap-4">
                <CardTitle className="font-black text-xl">User Registry ({filteredUsers.length})</CardTitle>
                <div className="relative w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input className="pl-10 bg-slate-50 border-none rounded-xl" placeholder="Filter by name/email..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50/50">
                    <tr className="text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
                      <th className="px-6 py-4">User</th>
                      <th className="px-6 py-4">Role</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50/50 transition-all">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center font-black text-sm shrink-0">
                              {user.name?.[0]}
                            </div>
                            <div>
                              <p className="font-black text-slate-800 text-sm">{user.name}</p>
                              <p className="text-xs text-slate-400">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge className={`rounded-lg border-none text-xs font-bold ${user.role === "ADMIN" ? "bg-red-50 text-red-600" : user.role === "TUTOR" ? "bg-amber-50 text-amber-600" : "bg-violet-50 text-violet-600"}`}>
                            {user.role}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <Badge className={`rounded-lg border-none text-xs ${user.isBanned ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600"}`}>
                            {user.isBanned ? "Banned" : "Active"}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="rounded-xl p-2 border-slate-100">
                              <DropdownMenuItem className="font-bold focus:bg-amber-50 text-amber-600" onClick={() => handleBan(user.id, user.isBanned)}>
                                {user.isBanned ? "Unban User" : "Ban User"}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-rose-600 font-bold focus:bg-rose-50" onClick={() => handleDelete(user.id, user.name)}>
                                <UserMinus className="w-4 h-4 mr-2" /> Delete User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {/* ── BOOKINGS TAB ── */}
          {tab === "bookings" && (
            <div className="space-y-4">
              <Card className="rounded-[2rem] border-none shadow-sm bg-white overflow-hidden">
                <div className="p-6 border-b border-slate-50 flex flex-wrap gap-3 items-center justify-between">
                  <CardTitle className="font-black text-xl">All Bookings ({filteredBookings.length})</CardTitle>
                  <div className="flex gap-3 flex-wrap">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input className="pl-10 bg-slate-50 border-none rounded-xl w-56" placeholder="Search student/course..." value={bookingSearch} onChange={(e) => setBookingSearch(e.target.value)} />
                    </div>
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-xl bg-slate-50 border-none px-3 py-2 text-sm font-bold text-slate-600 focus:outline-none">
                      <option value="ALL">All Status</option>
                      <option value="PENDING">Pending</option>
                      <option value="ACCEPTED">Accepted</option>
                      <option value="COMPLETED">Completed</option>
                      <option value="REJECTED">Rejected</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50/50">
                      <tr className="text-left text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
                        <th className="px-6 py-4">Student</th>
                        <th className="px-6 py-4">Course</th>
                        <th className="px-6 py-4">Tutor</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {filteredBookings.length === 0 ? (
                        <tr><td colSpan={6} className="text-center py-12 text-slate-400 italic font-medium">No bookings found</td></tr>
                      ) : filteredBookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-slate-50/50 transition-all">
                          <td className="px-6 py-4">
                            <p className="font-bold text-slate-800 text-sm">{booking.student?.name}</p>
                            <p className="text-xs text-slate-400">{booking.student?.email}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-bold text-slate-700 text-sm max-w-[160px] truncate">{booking.course?.title}</p>
                            <p className="text-xs text-emerald-600 font-bold">${booking.course?.price}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm text-slate-600 font-medium">{booking.tutor?.user?.name}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-xs text-slate-500">{new Date(booking.createdAt).toLocaleDateString()}</p>
                          </td>
                          <td className="px-6 py-4">
                            <Badge className={`rounded-lg border-none text-xs font-bold ${STATUS_COLORS[booking.status] || "bg-slate-100 text-slate-500"}`}>
                              {booking.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex gap-2 justify-end">
                              {booking.status === "ACCEPTED" && (
                                <button onClick={() => handleBookingStatus(booking.id, "COMPLETED")} className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white rounded-xl text-xs font-black hover:bg-blue-600 transition-colors">
                                  <Check className="w-3 h-3" /> Complete
                                </button>
                              )}
                              {["PENDING", "ACCEPTED"].includes(booking.status) && (
                                <button onClick={() => handleBookingStatus(booking.id, "CANCELLED")} className="flex items-center gap-1 px-3 py-1.5 bg-rose-50 text-rose-500 rounded-xl text-xs font-black hover:bg-rose-100 transition-colors">
                                  <X className="w-3 h-3" /> Cancel
                                </button>
                              )}
                              {booking.course?.id && (
                                <button onClick={() => handleDeleteCourse(booking.course.id, booking.course.title)} className="p-1.5 text-slate-300 hover:text-rose-500 transition-colors" title="Delete course">
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {/* ── CATEGORIES TAB ── */}
          {tab === "categories" && (
            <div className="space-y-6">
              {/* Create form */}
              <Card className="rounded-[2rem] border-none shadow-sm bg-white">
                <CardContent className="p-8">
                  <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-violet-600" /> Create New Category
                  </h3>
                  <form onSubmit={categoryForm.handleSubmit(handleCreateCategory)} className="flex flex-col md:flex-row gap-4">
                    <input
                      {...categoryForm.register("name", { required: true })}
                      placeholder="Category name (e.g. Web Development)"
                      className="flex-1 rounded-xl border border-slate-200 p-3 font-medium text-sm focus:outline-none focus:border-violet-400"
                    />
                    <input
                      {...categoryForm.register("description")}
                      placeholder="Description (optional)"
                      className="flex-1 rounded-xl border border-slate-200 p-3 font-medium text-sm focus:outline-none focus:border-violet-400"
                    />
                    <button
                      type="submit"
                      disabled={categoryForm.formState.isSubmitting}
                      className="bg-violet-600 text-white px-8 py-3 rounded-xl font-black hover:bg-violet-700 transition-colors flex items-center gap-2 whitespace-nowrap"
                    >
                      {categoryForm.formState.isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Plus className="w-4 h-4" /> Add Category</>}
                    </button>
                  </form>
                </CardContent>
              </Card>

              {/* Categories list */}
              <Card className="rounded-[2rem] border-none shadow-sm bg-white overflow-hidden">
                <div className="p-6 border-b border-slate-50">
                  <CardTitle className="font-black text-xl">All Categories ({categories.length})</CardTitle>
                </div>
                {categories.length === 0 ? (
                  <div className="text-center py-16 text-slate-400 italic">No categories yet. Create one above.</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                    {categories.map((cat: any) => (
                      <div key={cat.id} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-md transition-all group">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600 font-black text-lg">
                            {cat.name?.[0]?.toUpperCase()}
                          </div>
                          <div>
                            <p className="font-black text-slate-800">{cat.name}</p>
                            <p className="text-xs text-slate-400">{cat.courses?.length ?? 0} courses</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteCategory(cat.id, cat.name)}
                          className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors opacity-0 group-hover:opacity-100"
                          title="Delete category"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          )}
        </>
      )}
    </div>
  );
}
