"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Check,
  DollarSign,
  Folder,
  Loader2,
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
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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

type Tab = "users" | "bookings" | "categories";

const STATUS_CONFIG: Record<string, { bg: string; text: string; dot: string }> = {
  PENDING:   { bg: "bg-amber-500/10",   text: "text-amber-400",   dot: "bg-amber-400" },
  ACCEPTED:  { bg: "bg-emerald-500/10", text: "text-emerald-400", dot: "bg-emerald-400" },
  REJECTED:  { bg: "bg-rose-500/10",    text: "text-rose-400",    dot: "bg-rose-400" },
  COMPLETED: { bg: "bg-blue-500/10",    text: "text-blue-400",    dot: "bg-blue-400" },
  CANCELLED: { bg: "bg-slate-500/10",   text: "text-slate-400",   dot: "bg-slate-400" },
};

const ROLE_CONFIG: Record<string, { bg: string; text: string }> = {
  ADMIN:   { bg: "bg-rose-500/10",    text: "text-rose-400" },
  TUTOR:   { bg: "bg-amber-500/10",   text: "text-amber-400" },
  STUDENT: { bg: "bg-violet-500/10",  text: "text-violet-400" },
};

const stagger = {
  container: { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  },
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
    setCategories(
      Array.isArray(catRes) ? catRes : Array.isArray(catRes?.data) ? catRes.data : [],
    );
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const filteredUsers = useMemo(
    () =>
      users.filter(
        (u) =>
          u.name?.toLowerCase().includes(search.toLowerCase()) ||
          u.email?.toLowerCase().includes(search.toLowerCase()),
      ),
    [users, search],
  );

  const filteredBookings = useMemo(() => {
    let list = bookings;
    if (statusFilter !== "ALL") list = list.filter((b) => b.status === statusFilter);
    if (bookingSearch)
      list = list.filter(
        (b) =>
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
    { label: "Total Users",    val: stats?.totalUsers ?? users.length,           icon: Users,     from: "from-blue-600",    to: "to-cyan-500",     glow: "shadow-blue-500/25" },
    { label: "Total Tutors",   val: stats?.totalTutors ?? 0,                     icon: UserPlus,  from: "from-amber-600",   to: "to-orange-500",   glow: "shadow-amber-500/25" },
    { label: "Total Students", val: stats?.totalStudents ?? 0,                   icon: BookOpen,  from: "from-violet-600",  to: "to-purple-500",   glow: "shadow-violet-500/25" },
    { label: "Bookings",       val: stats?.totalBookings ?? bookings.length,     icon: TrendingUp,from: "from-indigo-600",  to: "to-blue-500",     glow: "shadow-indigo-500/25" },
    { label: "Revenue",        val: `$${(stats?.totalRevenue ?? 0).toFixed(2)}`, icon: DollarSign,from: "from-emerald-600", to: "to-teal-500",     glow: "shadow-emerald-500/25" },
    { label: "Avg Rating",     val: stats?.avgRating ?? "—",                     icon: Star,      from: "from-rose-600",    to: "to-pink-500",     glow: "shadow-rose-500/25" },
  ];

  const tabs: { key: Tab; label: string; icon: any; count?: number }[] = [
    { key: "users",      label: "Users",      icon: Users,      count: filteredUsers.length },
    { key: "bookings",   label: "Bookings",   icon: TrendingUp, count: filteredBookings.length },
    { key: "categories", label: "Categories", icon: Folder,     count: categories.length },
  ];

  const tabIndex = tabs.findIndex((t) => t.key === tab);

  return (
    <div
      className="min-h-screen p-6 md:p-8 space-y-8 max-w-7xl mx-auto"
      style={{ background: "linear-gradient(160deg, #0d0d1a 0%, #111827 50%, #0d0d1a 100%)" }}
    >
      {/* ── HEADER ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500 to-violet-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white italic tracking-tight">
              Admin{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-violet-400">
                Control
              </span>
            </h1>
          </div>
          <p className="text-white/40 font-medium text-sm pl-1">
            Platform overview & management
          </p>
        </div>
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="hidden md:flex w-12 h-12 rounded-2xl bg-white/5 border border-white/10 items-center justify-center"
        >
          <Zap className="w-5 h-5 text-violet-400" />
        </motion.div>
      </motion.div>

      {/* ── STAT CARDS ── */}
      <motion.div
        variants={stagger.container}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        {statCards.map((s, i) => (
          <motion.div
            key={i}
            variants={stagger.item}
            whileHover={{ y: -4, scale: 1.03 }}
            className={`relative overflow-hidden rounded-[1.5rem] bg-white/5 border border-white/10 p-5 backdrop-blur-sm shadow-lg ${s.glow} hover:border-white/20 transition-all duration-300 cursor-default`}
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.from} ${s.to} flex items-center justify-center mb-3 shadow-md`}>
              <s.icon className="w-4.5 h-4.5 text-white w-5 h-5" />
            </div>
            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-none">{s.label}</p>
            <h3 className="text-2xl font-black text-white mt-1 tabular-nums">{s.val}</h3>
            {/* decorative glow blob */}
            <div className={`absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br ${s.from} ${s.to} rounded-full blur-2xl opacity-20`} />
          </motion.div>
        ))}
      </motion.div>

      {/* ── TAB NAVIGATION ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative flex gap-1 bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-1.5"
        style={{ width: "fit-content" }}
      >
        {/* Animated pill indicator */}
        <motion.div
          className="absolute top-1.5 bottom-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/30"
          animate={{
            left: `calc(${tabIndex} * (100% / ${tabs.length}) + 6px)`,
            width: `calc(100% / ${tabs.length} - 12px)`,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
        />
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-sm transition-colors duration-200 ${
              tab === t.key ? "text-white" : "text-white/40 hover:text-white/70"
            }`}
          >
            <t.icon className="w-4 h-4" />
            {t.label}
            {t.count !== undefined && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                tab === t.key ? "bg-white/20 text-white" : "bg-white/10 text-white/40"
              }`}>
                {t.count}
              </span>
            )}
          </button>
        ))}
      </motion.div>

      {/* ── CONTENT ── */}
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-32 gap-4"
        >
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-2 border-violet-500/20" />
            <div className="absolute inset-0 rounded-full border-t-2 border-violet-500 animate-spin" />
            <Shield className="absolute inset-0 m-auto w-6 h-6 text-violet-400" />
          </div>
          <p className="text-white/30 font-bold text-sm">Loading dashboard data…</p>
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          {/* ── USERS TAB ── */}
          {tab === "users" && (
            <motion.div
              key="users"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden"
            >
              {/* Table header */}
              <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                  <h2 className="font-black text-white text-xl">User Registry</h2>
                  <p className="text-white/30 text-xs font-medium mt-0.5">{filteredUsers.length} users</p>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    className="pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 w-64 transition-colors"
                    placeholder="Search name or email…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-[10px] font-black text-white/30 uppercase tracking-[0.15em] border-b border-white/5">
                      <th className="px-6 py-4">User</th>
                      <th className="px-6 py-4">Role</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {filteredUsers.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="text-center py-16 text-white/20 italic font-bold">
                            No users match your search.
                          </td>
                        </tr>
                      ) : (
                        filteredUsers.map((user, i) => {
                          const role = ROLE_CONFIG[user.role] ?? ROLE_CONFIG.STUDENT;
                          return (
                            <motion.tr
                              key={user.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.04 }}
                              className="group border-b border-white/5 hover:bg-white/5 transition-colors"
                            >
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center font-black text-white text-sm shrink-0 shadow-md shadow-violet-900/40">
                                    {user.name?.[0]?.toUpperCase()}
                                  </div>
                                  <div>
                                    <p className="font-black text-white text-sm">{user.name}</p>
                                    <p className="text-xs text-white/30">{user.email}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-black ${role.bg} ${role.text}`}>
                                  {user.role}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-black ${
                                  user.isBanned ? "bg-rose-500/10 text-rose-400" : "bg-emerald-500/10 text-emerald-400"
                                }`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${user.isBanned ? "bg-rose-400" : "bg-emerald-400"}`} />
                                  {user.isBanned ? "Banned" : "Active"}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex justify-end gap-2">
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleBan(user.id, user.isBanned)}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-colors ${
                                      user.isBanned
                                        ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                                        : "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
                                    }`}
                                  >
                                    {user.isBanned ? "Unban" : "Ban"}
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleDelete(user.id, user.name)}
                                    className="p-1.5 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
                                    title="Delete user"
                                  >
                                    <UserMinus className="w-3.5 h-3.5" />
                                  </motion.button>
                                </div>
                              </td>
                            </motion.tr>
                          );
                        })
                      )}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* ── BOOKINGS TAB ── */}
          {tab === "bookings" && (
            <motion.div
              key="bookings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden"
            >
              <div className="p-6 border-b border-white/5 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div>
                  <h2 className="font-black text-white text-xl">All Bookings</h2>
                  <p className="text-white/30 text-xs font-medium mt-0.5">{filteredBookings.length} results</p>
                </div>
                <div className="flex flex-wrap gap-3 items-center">
                  {/* Status pill filters */}
                  <div className="flex gap-1.5 flex-wrap">
                    {["ALL", "PENDING", "ACCEPTED", "COMPLETED", "REJECTED", "CANCELLED"].map((s) => (
                      <button
                        key={s}
                        onClick={() => setStatusFilter(s)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                          statusFilter === s
                            ? "bg-violet-600 text-white shadow-md shadow-violet-500/30"
                            : "bg-white/5 text-white/40 hover:text-white/70 hover:bg-white/10 border border-white/10"
                        }`}
                      >
                        {s === "ALL" ? "All" : s.charAt(0) + s.slice(1).toLowerCase()}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      className="pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 w-52 transition-colors"
                      placeholder="Search…"
                      value={bookingSearch}
                      onChange={(e) => setBookingSearch(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-[10px] font-black text-white/30 uppercase tracking-[0.15em] border-b border-white/5">
                      <th className="px-6 py-4">Student</th>
                      <th className="px-6 py-4">Course</th>
                      <th className="px-6 py-4">Tutor</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-16 text-white/20 italic font-bold">
                          No bookings found.
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map((booking, i) => {
                        const sc = STATUS_CONFIG[booking.status] ?? STATUS_CONFIG.PENDING;
                        return (
                          <motion.tr
                            key={booking.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.04 }}
                            className="group border-b border-white/5 hover:bg-white/5 transition-colors"
                          >
                            <td className="px-6 py-4">
                              <p className="font-bold text-white text-sm">{booking.student?.name}</p>
                              <p className="text-xs text-white/30">{booking.student?.email}</p>
                            </td>
                            <td className="px-6 py-4">
                              <p className="font-bold text-white/80 text-sm max-w-[140px] truncate">{booking.course?.title}</p>
                              <p className="text-xs text-emerald-400 font-black">${booking.course?.price}</p>
                            </td>
                            <td className="px-6 py-4">
                              <p className="text-sm text-white/60 font-medium">{booking.tutor?.user?.name}</p>
                            </td>
                            <td className="px-6 py-4">
                              <p className="text-xs text-white/40 font-medium">{new Date(booking.createdAt).toLocaleDateString()}</p>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-black ${sc.bg} ${sc.text}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                                {booking.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex gap-2 justify-end">
                                {booking.status === "ACCEPTED" && (
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleBookingStatus(booking.id, "COMPLETED")}
                                    className="flex items-center gap-1 px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-xl text-xs font-black hover:bg-blue-500/20 transition-colors"
                                  >
                                    <Check className="w-3 h-3" /> Complete
                                  </motion.button>
                                )}
                                {["PENDING", "ACCEPTED"].includes(booking.status) && (
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleBookingStatus(booking.id, "CANCELLED")}
                                    className="flex items-center gap-1 px-3 py-1.5 bg-rose-500/10 text-rose-400 rounded-xl text-xs font-black hover:bg-rose-500/20 transition-colors"
                                  >
                                    <X className="w-3 h-3" /> Cancel
                                  </motion.button>
                                )}
                                {booking.course?.id && (
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleDeleteCourse(booking.course.id, booking.course.title)}
                                    className="p-1.5 rounded-xl bg-rose-500/5 text-white/20 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                                    title="Delete course"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </motion.button>
                                )}
                              </div>
                            </td>
                          </motion.tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* ── CATEGORIES TAB ── */}
          {tab === "categories" && (
            <motion.div
              key="categories"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              {/* Create form */}
              <div className="rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-sm p-8 relative overflow-hidden">
                {/* Decorative glow */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
                <h3 className="font-black text-white text-xl mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-md shadow-violet-500/30">
                    <Plus className="w-4 h-4 text-white" />
                  </span>
                  Create New Category
                </h3>
                <form
                  onSubmit={categoryForm.handleSubmit(handleCreateCategory)}
                  className="flex flex-col md:flex-row gap-3"
                >
                  <input
                    {...categoryForm.register("name", { required: true })}
                    placeholder="Category name (e.g. Web Development)"
                    className="flex-1 rounded-xl bg-white/5 border border-white/10 px-4 py-3 font-medium text-sm text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 transition-colors"
                  />
                  <input
                    {...categoryForm.register("description")}
                    placeholder="Description (optional)"
                    className="flex-1 rounded-xl bg-white/5 border border-white/10 px-4 py-3 font-medium text-sm text-white placeholder-white/30 focus:outline-none focus:border-violet-500/50 transition-colors"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={categoryForm.formState.isSubmitting}
                    className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-7 py-3 rounded-xl font-black text-sm hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/30 whitespace-nowrap disabled:opacity-50"
                  >
                    {categoryForm.formState.isSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <><Plus className="w-4 h-4" /> Add Category</>
                    )}
                  </motion.button>
                </form>
              </div>

              {/* Categories grid */}
              <div className="rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                  <div>
                    <h2 className="font-black text-white text-xl">All Categories</h2>
                    <p className="text-white/30 text-xs font-medium mt-0.5">{categories.length} categories</p>
                  </div>
                </div>

                {categories.length === 0 ? (
                  <div className="text-center py-20 text-white/20 italic font-bold">
                    No categories yet. Create one above.
                  </div>
                ) : (
                  <motion.div
                    variants={stagger.container}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6"
                  >
                    {categories.map((cat: any, i) => (
                      <motion.div
                        key={cat.id}
                        variants={stagger.item}
                        whileHover={{ y: -3, scale: 1.02 }}
                        className="group relative flex items-center justify-between p-5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-500/30 rounded-2xl transition-all duration-300 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/0 to-indigo-600/0 group-hover:from-violet-600/5 group-hover:to-indigo-600/5 transition-all duration-500" />
                        <div className="flex items-center gap-3 relative z-10">
                          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-black text-base shadow-md shadow-violet-900/40 shrink-0">
                            {cat.name?.[0]?.toUpperCase()}
                          </div>
                          <div>
                            <p className="font-black text-white text-sm">{cat.name}</p>
                            <p className="text-xs text-white/30 font-medium">{cat.courses?.length ?? 0} courses</p>
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteCategory(cat.id, cat.name)}
                          className="relative z-10 p-2 rounded-xl text-white/20 hover:text-rose-400 hover:bg-rose-500/10 transition-all opacity-0 group-hover:opacity-100"
                          title="Delete category"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
