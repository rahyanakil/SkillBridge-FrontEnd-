"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  createOrUpdateTutorProfile,
  createTutorCourse,
  deleteTutorCourse,
  getClassroomLink,
  getTutorBookings,
  getTutorEarnings,
  updateBookingStatus,
  updateTutorCourse,
} from "@/services/Dashboard/tutorActions";
import { getAllCategories } from "@/services/category/CategoryAction";
import {
  BookOpen,
  Check,
  DollarSign,
  Edit2,
  Loader2,
  MessageSquare,
  Plus,
  Settings,
  Trash2,
  TrendingUp,
  Users,
  Video,
  X,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  initialBookings: any[];
  initialEarnings: any;
  initialCategories: any[];
}

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
    const [bookRes, earnRes, catRes] = await Promise.all([
      getTutorBookings(),
      getTutorEarnings(),
      getAllCategories(),
    ]);
    setBookings(Array.isArray(bookRes?.data) ? bookRes.data : []);
    setEarnings(earnRes?.data || null);
    setCategories(Array.isArray(catRes?.data) ? catRes.data : []);
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
    const res = await createOrUpdateTutorProfile({
      ...data,
      hourlyRate: parseFloat(data.hourlyRate),
      experience: parseInt(data.experience),
    });
    if (res?.success) { toast.success("Profile updated!"); setShowProfileForm(false); profileForm.reset(); }
    else toast.error(res?.message || "Profile update failed");
  };

  const totalRevenue = useMemo(() =>
    earnings?.totalEarnings ?? bookings.filter((b) => b.status === "COMPLETED").reduce((s: number, b: any) => s + (b.course?.price || 0), 0),
    [earnings, bookings]);

  const stats = useMemo(() => [
    { title: "Total Revenue", value: `$${typeof totalRevenue === "number" ? totalRevenue.toFixed(2) : "0.00"}`, icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Total Sessions", value: (earnings?.totalSessions ?? bookings.length).toString(), icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Pending Requests", value: bookings.filter((b) => b.status === "PENDING").length.toString(), icon: MessageSquare, color: "text-amber-500", bg: "bg-amber-50" },
    { title: "Completed", value: bookings.filter((b) => b.status === "COMPLETED").length.toString(), icon: TrendingUp, color: "text-violet-600", bg: "bg-violet-50" },
  ], [bookings, earnings, totalRevenue]);

  const topCourses = earnings?.byCourse?.slice(0, 5) || [];

  return (
    <div className="p-6 space-y-8 animate-in fade-in zoom-in-95 duration-500 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-900 italic tracking-tight leading-none">
            Tutor <span className="text-emerald-600">Insights</span>
          </h1>
          <p className="text-slate-500 font-medium mt-2">Manage courses, sessions & earnings.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => { setShowProfileForm(!showProfileForm); setShowCourseForm(false); }} className="flex items-center gap-2 bg-slate-800 text-white px-5 py-3 rounded-2xl font-black hover:bg-slate-900 transition-colors">
            <Settings className="w-4 h-4" /> Setup Profile
          </button>
          <button onClick={() => { setShowCourseForm(!showCourseForm); setShowProfileForm(false); }} className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-2xl font-black hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-100">
            <Plus className="w-4 h-4" /> New Course
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-xl shadow-slate-100/50 rounded-[2.5rem] group hover:bg-slate-900 transition-all duration-500 cursor-pointer">
            <CardContent className="p-8">
              <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6 group-hover:bg-white/10 group-hover:text-white transition-all duration-500`}>
                <stat.icon className="w-7 h-7" />
              </div>
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">{stat.title}</h4>
              <p className="text-4xl font-black text-slate-900 group-hover:text-white transition-colors mt-2">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {showProfileForm && (
        <Card className="rounded-[2rem] border-none shadow-md">
          <CardContent className="p-8">
            <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2"><Settings className="w-5 h-5 text-slate-600" /> Tutor Profile Setup</h3>
            <form onSubmit={profileForm.handleSubmit(handleUpdateProfile)} className="grid md:grid-cols-2 gap-4">
              <input {...profileForm.register("expertise", { required: true })} placeholder="Your expertise (e.g. Web Development)" className="rounded-xl border border-slate-200 p-3 font-medium text-sm focus:outline-none focus:border-emerald-400" />
              <input {...profileForm.register("hourlyRate", { required: true })} type="number" placeholder="Hourly rate ($)" className="rounded-xl border border-slate-200 p-3 font-medium text-sm focus:outline-none focus:border-emerald-400" />
              <input {...profileForm.register("experience", { required: true })} type="number" placeholder="Years of experience" className="rounded-xl border border-slate-200 p-3 font-medium text-sm focus:outline-none focus:border-emerald-400" />
              <textarea {...profileForm.register("bio", { required: true })} placeholder="Write a short bio about yourself..." className="rounded-xl border border-slate-200 p-3 font-medium text-sm focus:outline-none focus:border-emerald-400 md:col-span-2 resize-none h-24" />
              <div className="md:col-span-2 flex gap-3">
                <button type="submit" disabled={profileForm.formState.isSubmitting} className="bg-slate-800 text-white px-8 py-3 rounded-xl font-black hover:bg-slate-900 transition-colors flex items-center gap-2">
                  {profileForm.formState.isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Profile"}
                </button>
                <button type="button" onClick={() => setShowProfileForm(false)} className="bg-slate-100 text-slate-600 px-8 py-3 rounded-xl font-black hover:bg-slate-200 transition-colors">Cancel</button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {showCourseForm && (
        <Card className="rounded-[2rem] border-none shadow-md">
          <CardContent className="p-8">
            <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2"><BookOpen className="w-5 h-5 text-emerald-600" /> Create New Course</h3>
            <form onSubmit={courseForm.handleSubmit(handleCreateCourse)} className="grid md:grid-cols-2 gap-4">
              <input {...courseForm.register("title", { required: true })} placeholder="Course title" className="rounded-xl border border-slate-200 p-3 font-medium text-sm focus:outline-none focus:border-emerald-400" />
              <input {...courseForm.register("price", { required: true })} type="number" placeholder="Price ($)" className="rounded-xl border border-slate-200 p-3 font-medium text-sm focus:outline-none focus:border-emerald-400" />
              <select {...courseForm.register("categoryId", { required: true })} className="rounded-xl border border-slate-200 p-3 font-medium text-sm focus:outline-none focus:border-emerald-400">
                <option value="">Select category</option>
                {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <textarea {...courseForm.register("description", { required: true })} placeholder="Course description (min 10 chars)" className="rounded-xl border border-slate-200 p-3 font-medium text-sm focus:outline-none focus:border-emerald-400 md:col-span-2 resize-none h-24" />
              <div className="md:col-span-2 flex gap-3">
                <button type="submit" disabled={courseForm.formState.isSubmitting} className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-black hover:bg-emerald-700 transition-colors flex items-center gap-2">
                  {courseForm.formState.isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Course"}
                </button>
                <button type="button" onClick={() => setShowCourseForm(false)} className="bg-slate-100 text-slate-600 px-8 py-3 rounded-xl font-black hover:bg-slate-200 transition-colors">Cancel</button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {editingCourse && (
        <Card className="rounded-[2rem] border-none shadow-md border-2 border-emerald-200">
          <CardContent className="p-8">
            <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
              <Edit2 className="w-5 h-5 text-emerald-600" /> Edit Course: {editingCourse.title}
            </h3>
            <form onSubmit={editCourseForm.handleSubmit(handleSaveCourseEdit)} className="grid md:grid-cols-2 gap-4">
              <input {...editCourseForm.register("title", { required: true })} placeholder="Course title" className="rounded-xl border border-slate-200 p-3 font-medium text-sm focus:outline-none focus:border-emerald-400" />
              <input {...editCourseForm.register("price", { required: true })} type="number" placeholder="Price ($)" className="rounded-xl border border-slate-200 p-3 font-medium text-sm focus:outline-none focus:border-emerald-400" />
              <textarea {...editCourseForm.register("description", { required: true })} placeholder="Course description" className="rounded-xl border border-slate-200 p-3 font-medium text-sm focus:outline-none focus:border-emerald-400 md:col-span-2 resize-none h-24" />
              <div className="md:col-span-2 flex gap-3">
                <button type="submit" disabled={editCourseForm.formState.isSubmitting} className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-black hover:bg-emerald-700 transition-colors flex items-center gap-2">
                  {editCourseForm.formState.isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
                </button>
                <button type="button" onClick={() => setEditingCourse(null)} className="bg-slate-100 text-slate-600 px-8 py-3 rounded-xl font-black hover:bg-slate-200 transition-colors">Cancel</button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-8 md:grid-cols-3">
        <Card className="md:col-span-2 rounded-[3rem] border-none shadow-sm bg-white p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black text-slate-800">Student Requests</h3>
            <Badge className="bg-slate-100 text-slate-600 rounded-lg font-bold">{bookings.length} total</Badge>
          </div>
          <div className="space-y-4">
            {bookings.length > 0 ? bookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] hover:bg-white hover:shadow-lg transition-all group">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-xl font-bold">
                    {booking.student?.name?.[0] || "S"}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-800">{booking.student?.name || "Student"}</h4>
                    <p className="text-xs text-slate-500 font-medium">{booking.course?.title}</p>
                    <Badge className={`text-xs mt-1 border-none ${booking.status === "ACCEPTED" ? "bg-emerald-50 text-emerald-600" : booking.status === "PENDING" ? "bg-amber-50 text-amber-600" : "bg-slate-100 text-slate-500"}`}>
                      {booking.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  {booking.status === "PENDING" && (
                    <>
                      <button onClick={() => handleStatus(booking.id, "ACCEPTED")} className="h-12 w-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center hover:scale-110 transition-transform"><Check className="w-5 h-5" /></button>
                      <button onClick={() => handleStatus(booking.id, "REJECTED")} className="h-12 w-12 bg-rose-500 text-white rounded-2xl flex items-center justify-center hover:scale-110 transition-transform"><X className="w-5 h-5" /></button>
                    </>
                  )}
                  {booking.status === "ACCEPTED" && (
                    <>
                      <button onClick={() => handleStatus(booking.id, "COMPLETED")} className="h-10 px-3 bg-blue-500 text-white rounded-xl text-xs font-black hover:bg-blue-600 transition-colors">Complete</button>
                      <button onClick={() => handleClassroom(booking.id)} disabled={classroomLoading === booking.id} className="h-10 w-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center hover:bg-emerald-600 transition-colors">
                        {classroomLoading === booking.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Video className="w-4 h-4" />}
                      </button>
                    </>
                  )}
                </div>
              </div>
            )) : (
              <p className="text-center py-20 font-bold text-slate-300 italic uppercase tracking-widest">No requests yet</p>
            )}
          </div>
        </Card>

        <Card className="rounded-[3rem] border-none bg-emerald-600 p-10 text-white relative overflow-hidden shadow-2xl shadow-emerald-200">
          <div className="relative z-10">
            <h3 className="text-xl font-black mb-4 tracking-widest uppercase text-emerald-100">Earnings</h3>
            <p className="text-6xl font-black tracking-tighter italic">${typeof totalRevenue === "number" ? totalRevenue.toFixed(0) : "0"}</p>
            <p className="text-emerald-200 text-sm mt-1">{earnings?.totalSessions ?? 0} completed sessions</p>
            {topCourses.length > 0 && (
              <div className="mt-8 space-y-3">
                <p className="text-xs font-black uppercase tracking-widest text-emerald-200">Top Courses</p>
                {topCourses.map((c: any, i: number) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="truncate text-emerald-100 max-w-[140px]">{c.title}</span>
                    <span className="font-black">${c.revenue.toFixed(0)}</span>
                  </div>
                ))}
              </div>
            )}
            {bookings.length > 0 && (
              <div className="mt-8">
                <p className="text-xs font-black uppercase tracking-widest text-emerald-200 mb-3">Your Courses</p>
                {[...new Map(bookings.map((b) => [b.courseId, b.course])).values()].map((course: any) => (
                  <div key={course?.id} className="flex items-center justify-between text-sm mb-2">
                    <span className="text-emerald-100 truncate max-w-[100px]">{course?.title}</span>
                    <div className="flex gap-2">
                      <button onClick={() => handleEditCourse(course)} className="text-emerald-200 hover:text-white transition-colors"><Edit2 className="w-3 h-3" /></button>
                      <button onClick={() => handleDeleteCourse(course?.id, course?.title)} className="text-rose-300 hover:text-rose-100 transition-colors"><Trash2 className="w-3 h-3" /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="absolute -right-16 -bottom-16 w-60 h-60 bg-white/10 rounded-full blur-[80px]" />
        </Card>
      </div>
    </div>
  );
}
