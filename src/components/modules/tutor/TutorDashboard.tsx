"use client";

import { Badge } from "@/components/ui/badge";
import { AnimatePresence, motion } from "framer-motion";
import {
  createOrUpdateTutorProfile, createTutorCourse, deleteTutorCourse,
  getClassroomLink, getTutorBookings, getTutorEarnings, updateBookingStatus, updateTutorCourse,
} from "@/services/Dashboard/tutorActions";
import { getAllCategories } from "@/services/category/CategoryAction";
import {
  BookOpen, Check, DollarSign, Edit2, Loader2, MessageSquare,
  Plus, Settings, TrendingUp, Users, Video, X,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const fadeUp = { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45 } };

interface Props { initialBookings: any[]; initialEarnings: any; initialCategories: any[]; }

const STATUS_DOT: Record<string, string> = {
  PENDING: "bg-amber-400", ACCEPTED: "bg-emerald-400",
  REJECTED: "bg-rose-400", COMPLETED: "bg-blue-400", CANCELLED: "bg-slate-300",
};

function FormPanel({ title, icon: Icon, color, onClose, children }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: -16, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.98 }} className="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden">
      <div className={`h-1 bg-gradient-to-r ${color}`} />
      <div className="p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-black text-slate-900 flex items-center gap-2"><Icon className="w-5 h-5 text-emerald-600" />{title}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"><X className="w-4 h-4" /></button>
        </div>
        {children}
      </div>
    </motion.div>
  );
}

const inputCls = "w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-medium text-sm focus:outline-none focus:border-emerald-400 focus:bg-white transition-colors";

export default function TutorDashboard({ initialBookings, initialEarnings, initialCategories }: Props) {
  const [bookings, setBookings] = useState(initialBookings);
  const [earnings, setEarnings] = useState(initialEarnings);
  const [categories, setCategories] = useState(initialCategories);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [classroomLoading, setClassroomLoading] = useState<string | null>(null);
  const courseForm = useForm<{ title: string; description: string; price: number; categoryId: string }>();
  const profileForm = useForm<{ bio: string; expertise: string; hourlyRate: number; experience: number }>();
  const editCourseForm = useForm<{ title: string; description: string; price: number }>();

  const refresh = useCallback(async () => {
    const [bookRes, earnRes, catRes] = await Promise.all([getTutorBookings(), getTutorEarnings(), getAllCategories()]);
    setBookings(Array.isArray(bookRes?.data) ? bookRes.data : []);
    setEarnings(earnRes?.data || null);
    setCategories(Array.isArray(catRes) ? catRes : []);
  }, []);

  const handleStatus = async (id: string, status: string) => {
    const res = await updateBookingStatus(id, status);
    if (res?.success) { toast.success(`Booking ${status.toLowerCase()}`); refresh(); }
    else toast.error(res?.message || "Update failed");
  };

  const handleClassroom = async (bookingId: string) => {
    setClassroomLoading(bookingId);
    const res = await getClassroomLink(bookingId);
    setClassroomLoading(null);
    if (res?.success) window.open(res.data.classroomLink, "_blank");
    else toast.error(res?.message || "Failed to get classroom link");
  };

  const handleDeleteCourse = async (courseId: string, title: string) => {
    if (!confirm(`Delete course "${title}"?`)) return;
    const res = await deleteTutorCourse(courseId);
    if (res?.success) { toast.success("Course deleted"); refresh(); }
    else toast.error(res?.message || "Delete failed");
  };

  const handleCreateCourse = async (data: any) => {
    const res = await createTutorCourse({ ...data, price: parseFloat(data.price) });
    if (res?.success) { toast.success("Course created!"); setShowCourseForm(false); courseForm.reset(); refresh(); }
    else toast.error(res?.message || "Failed to create course");
  };

  const handleEditCourse = (course: any) => {
    setEditingCourse(course);
    editCourseForm.reset({ title: course.title, description: course.description, price: course.price });
  };

  const handleSaveCourseEdit = async (data: any) => {
    if (!editingCourse) return;
    const res = await updateTutorCourse(editingCourse.id, { ...data, price: parseFloat(data.price) });
    if (res?.success) { toast.success("Course updated!"); setEditingCourse(null); refresh(); }
    else toast.error(res?.message || "Update failed");
  };

  const handleUpdateProfile = async (data: any) => {
    const res = await createOrUpdateTutorProfile({ ...data, hourlyRate: parseFloat(data.hourlyRate), experience: parseInt(data.experience) });
    if (res?.success) { toast.success("Profile updated!"); setShowProfileForm(false); profileForm.reset(); }
    else toast.error(res?.message || "Profile update failed");
  };

  const totalRevenue = useMemo(() =>
    earnings?.totalEarnings ?? bookings.filter((b) => b.status === "COMPLETED").reduce((s: number, b: any) => s + (b.course?.price || 0), 0),
    [earnings, bookings]);

  const stats = useMemo(() => [
    { title: "Total Revenue", value: `$${typeof totalRevenue === "number" ? totalRevenue.toFixed(2) : "0.00"}`, icon: DollarSign, gradient: "from-emerald-400 to-teal-500", bg: "bg-emerald-50", text: "text-emerald-600" },
    { title: "Total Sessions", value: earnings?.totalSessions ?? bookings.length, icon: Users, gradient: "from-blue-400 to-indigo-500", bg: "bg-blue-50", text: "text-blue-600" },
    { title: "Pending Requests", value: bookings.filter((b) => b.status === "PENDING").length, icon: MessageSquare, gradient: "from-amber-400 to-orange-500", bg: "bg-amber-50", text: "text-amber-600" },
    { title: "Completed", value: bookings.filter((b) => b.status === "COMPLETED").length, icon: TrendingUp, gradient: "from-violet-500 to-indigo-600", bg: "bg-violet-50", text: "text-violet-600" },
  ], [bookings, earnings, totalRevenue]);

  const topCourses = earnings?.byCourse?.slice(0, 5) || [];
  const uniqueCourses = [...new Map(bookings.map((b) => [b.courseId, b.course])).values()].filter(Boolean);

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div {...fadeUp} className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black text-emerald-500 uppercase tracking-widest mb-1">Tutor Dashboard</p>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Tutor <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">Insights</span>
          </h1>
          <p className="text-slate-500 font-medium mt-1 text-sm">Manage your courses, sessions & earnings.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => { setShowProfileForm(!showProfileForm); setShowCourseForm(false); setEditingCourse(null); }}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-4 py-2.5 rounded-xl font-black text-sm transition-all active:scale-95">
            <Settings className="w-4 h-4" /> Profile
          </button>
          <button onClick={() => { setShowCourseForm(!showCourseForm); setShowProfileForm(false); setEditingCourse(null); }}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-black text-sm shadow-lg shadow-emerald-200 transition-all active:scale-95">
            <Plus className="w-4 h-4" /> New Course
          </button>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <div className="group relative bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-xl hover:shadow-emerald-50/60 transition-all duration-300 overflow-hidden cursor-default">
              <div className={`absolute inset-0 bg-gradient-to-br ${s.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              <div className={`${s.bg} w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <s.icon className={`w-5 h-5 ${s.text}`} />
              </div>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{s.title}</p>
              <p className="text-2xl md:text-3xl font-black text-slate-900 mt-1 tracking-tight">{s.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expandable forms */}
      <AnimatePresence>
        {showProfileForm && (
          <FormPanel title="Setup Tutor Profile" icon={Settings} color="from-slate-600 to-slate-800" onClose={() => setShowProfileForm(false)}>
            <form onSubmit={profileForm.handleSubmit(handleUpdateProfile)} className="grid md:grid-cols-2 gap-3">
              <input {...profileForm.register("expertise", { required: true })} placeholder="Your expertise (e.g. Web Development)" className={inputCls} />
              <input {...profileForm.register("hourlyRate", { required: true })} type="number" step="0.01" placeholder="Hourly rate ($)" className={inputCls} />
              <input {...profileForm.register("experience", { required: true })} type="number" placeholder="Years of experience" className={inputCls} />
              <textarea {...profileForm.register("bio", { required: true })} placeholder="Write a short bio..." className={`${inputCls} resize-none h-24`} />
              <div className="md:col-span-2 flex gap-3">
                <button type="submit" disabled={profileForm.formState.isSubmitting} className="bg-slate-800 text-white px-6 py-2.5 rounded-xl font-black hover:bg-slate-900 transition-colors flex items-center gap-2 text-sm">
                  {profileForm.formState.isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Profile"}
                </button>
                <button type="button" onClick={() => setShowProfileForm(false)} className="bg-slate-100 text-slate-600 px-6 py-2.5 rounded-xl font-black hover:bg-slate-200 transition-colors text-sm">Cancel</button>
              </div>
            </form>
          </FormPanel>
        )}
        {showCourseForm && (
          <FormPanel title="Create New Course" icon={BookOpen} color="from-emerald-400 to-teal-500" onClose={() => setShowCourseForm(false)}>
            <form onSubmit={courseForm.handleSubmit(handleCreateCourse)} className="grid md:grid-cols-2 gap-3">
              <input {...courseForm.register("title", { required: true })} placeholder="Course title" className={inputCls} />
              <input {...courseForm.register("price", { required: true })} type="number" step="0.01" placeholder="Price ($)" className={inputCls} />
              <select {...courseForm.register("categoryId", { required: true })} className={inputCls}>
                <option value="">Select category</option>
                {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <textarea {...courseForm.register("description", { required: true })} placeholder="Course description" className={`${inputCls} resize-none h-24`} />
              <div className="md:col-span-2 flex gap-3">
                <button type="submit" disabled={courseForm.formState.isSubmitting} className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-black hover:bg-emerald-700 transition-colors flex items-center gap-2 text-sm">
                  {courseForm.formState.isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Plus className="w-4 h-4" />Create Course</>}
                </button>
                <button type="button" onClick={() => setShowCourseForm(false)} className="bg-slate-100 text-slate-600 px-6 py-2.5 rounded-xl font-black text-sm hover:bg-slate-200 transition-colors">Cancel</button>
              </div>
            </form>
          </FormPanel>
        )}
        {editingCourse && (
          <FormPanel title={`Edit: ${editingCourse.title}`} icon={Edit2} color="from-emerald-400 to-emerald-600" onClose={() => setEditingCourse(null)}>
            <form onSubmit={editCourseForm.handleSubmit(handleSaveCourseEdit)} className="grid md:grid-cols-2 gap-3">
              <input {...editCourseForm.register("title", { required: true })} placeholder="Course title" className={inputCls} />
              <input {...editCourseForm.register("price", { required: true })} type="number" step="0.01" className={inputCls} />
              <textarea {...editCourseForm.register("description", { required: true })} className={`${inputCls} resize-none h-24 md:col-span-2`} />
              <div className="md:col-span-2 flex gap-3">
                <button type="submit" disabled={editCourseForm.formState.isSubmitting} className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-black hover:bg-emerald-700 transition-colors text-sm flex items-center gap-2">
                  {editCourseForm.formState.isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
                </button>
                <button type="button" onClick={() => setEditingCourse(null)} className="bg-slate-100 text-slate-600 px-6 py-2.5 rounded-xl font-black text-sm hover:bg-slate-200 transition-colors">Cancel</button>
              </div>
            </form>
          </FormPanel>
        )}
      </AnimatePresence>

      {/* Main grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Booking requests */}
        <motion.div className="lg:col-span-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
              <h3 className="font-black text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-500" /> Student Requests
              </h3>
              <Badge className="bg-slate-100 text-slate-600 border-none font-bold">{bookings.length}</Badge>
            </div>
            <div className="divide-y divide-slate-50 max-h-[440px] overflow-y-auto">
              <AnimatePresence>
                {bookings.length > 0 ? bookings.map((booking, i) => (
                  <motion.div key={booking.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between p-4 hover:bg-slate-50/60 transition-colors group">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center font-black text-emerald-700 text-sm shrink-0">
                        {booking.student?.name?.[0] || "S"}
                      </div>
                      <div className="min-w-0">
                        <p className="font-black text-slate-800 text-sm truncate">{booking.student?.name || "Student"}</p>
                        <p className="text-[11px] text-slate-400 truncate">{booking.course?.title}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[booking.status] || "bg-slate-300"}`} />
                          <span className="text-[10px] font-black text-slate-400 uppercase">{booking.status}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0 ml-2">
                      {booking.status === "PENDING" && (
                        <>
                          <button onClick={() => handleStatus(booking.id, "ACCEPTED")} className="w-9 h-9 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95">
                            <Check className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleStatus(booking.id, "REJECTED")} className="w-9 h-9 bg-rose-500 hover:bg-rose-600 text-white rounded-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95">
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      {booking.status === "ACCEPTED" && (
                        <>
                          <button onClick={() => handleStatus(booking.id, "COMPLETED")} className="h-9 px-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-xs font-black transition-colors">Done</button>
                          <button onClick={() => handleClassroom(booking.id)} disabled={classroomLoading === booking.id} className="w-9 h-9 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl flex items-center justify-center transition-colors">
                            {classroomLoading === booking.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Video className="w-3.5 h-3.5" />}
                          </button>
                        </>
                      )}
                    </div>
                  </motion.div>
                )) : (
                  <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                    <MessageSquare className="w-10 h-10 mb-3 opacity-20" />
                    <p className="font-bold italic text-sm">No requests yet</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Earnings & courses */}
        <motion.div className="space-y-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
          {/* Earnings card */}
          <div className="relative rounded-2xl overflow-hidden p-6 text-white" style={{ background: "linear-gradient(135deg, #065f46 0%, #059669 50%, #10b981 100%)" }}>
            <div className="absolute inset-0">
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-emerald-300/20 rounded-full blur-xl" />
            </div>
            <div className="relative z-10">
              <p className="text-emerald-200 text-xs font-black uppercase tracking-widest mb-2">Total Earnings</p>
              <p className="text-5xl font-black tracking-tight">${typeof totalRevenue === "number" ? totalRevenue.toFixed(0) : "0"}</p>
              <p className="text-emerald-200 text-sm mt-1">{earnings?.totalSessions ?? 0} completed sessions</p>
              {topCourses.length > 0 && (
                <div className="mt-5 pt-4 border-t border-white/10 space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-emerald-200">Top Earners</p>
                  {topCourses.map((c: any, i: number) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="truncate text-emerald-100 max-w-[120px]">{c.title}</span>
                      <span className="font-black">${c.revenue.toFixed(0)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Your courses */}
          {uniqueCourses.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-50 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-500" />
                <h4 className="font-black text-slate-900 text-sm">Your Courses</h4>
              </div>
              <div className="divide-y divide-slate-50">
                {uniqueCourses.map((course: any) => (
                  <div key={course?.id} className="flex items-center justify-between p-3 hover:bg-slate-50 transition-colors group">
                    <p className="text-sm font-bold text-slate-700 truncate flex-1 mr-2">{course?.title}</p>
                    <div className="flex gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEditCourse(course)} className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDeleteCourse(course?.id, course?.title)} className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
