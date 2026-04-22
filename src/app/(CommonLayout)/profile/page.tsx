import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { ReactElement } from "react";
import { getProfile } from "@/services/profile";
import { getStudentBookings, getCompletedCourses } from "@/services/Dashboard/studentActions";
import { getAdminStats } from "@/services/Dashboard/adminActions";
import { getTutorEarnings, getMyTutorProfile } from "@/services/Dashboard/tutorActions";
import Link from "next/link";
import {
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  DollarSign,
  Edit3,
  Mail,
  ShieldCheck,
  Star,
  TrendingUp,
  User,
  Users,
} from "lucide-react";

const ProfilePage = async () => {
  const user = await getProfile();

  if (!user) {
    return (
      <div className="text-center py-20 font-bold">User profile not found!</div>
    );
  }

  const joinedDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  let activityTitle = "Activity";
  let stats: { label: string; count: string; icon: ReactElement; bg: string }[] = [];
  let tutorProfile: { bio?: string; expertise?: string; hourlyRate?: number; experience?: number } | null = null;

  if (user.role === "STUDENT") {
    activityTitle = "Learning Activity";
    const [bookRes, compRes] = await Promise.all([
      getStudentBookings(),
      getCompletedCourses(),
    ]);
    const enrolled = Array.isArray(bookRes?.data) ? bookRes.data.length : 0;
    const completedCount = Array.isArray(compRes?.data) ? compRes.data.length : 0;
    stats = [
      { label: "Enrolled", count: enrolled.toString().padStart(2, "0"), icon: <BookOpen />, bg: "bg-blue-500" },
      { label: "Completed", count: completedCount.toString().padStart(2, "0"), icon: <Award />, bg: "bg-green-500" },
      { label: "In Progress", count: Math.max(0, enrolled - completedCount).toString().padStart(2, "0"), icon: <Star />, bg: "bg-yellow-500" },
    ];
  } else if (user.role === "TUTOR") {
    activityTitle = "Teaching Activity";
    const [earningsRes, profileRes] = await Promise.all([
      getTutorEarnings(),
      getMyTutorProfile(),
    ]);
    const earnings = earningsRes?.data ?? earningsRes;
    const totalEarnings = earnings?.totalEarnings ?? 0;
    const totalSessions = earnings?.totalSessions ?? 0;
    const totalCourses = earnings?.byCourse?.length ?? 0;
    tutorProfile = profileRes?.data ?? null;
    stats = [
      { label: "Courses", count: totalCourses.toString().padStart(2, "0"), icon: <BookOpen />, bg: "bg-blue-500" },
      { label: "Sessions", count: totalSessions.toString().padStart(2, "0"), icon: <Award />, bg: "bg-green-500" },
      { label: "Earned ($)", count: totalEarnings.toFixed(0).padStart(2, "0"), icon: <DollarSign />, bg: "bg-yellow-500" },
    ];
  } else if (user.role === "ADMIN") {
    activityTitle = "Platform Stats";
    const statsRes = await getAdminStats();
    const data = statsRes?.data ?? {};
    stats = [
      { label: "Total Users", count: (data.totalUsers ?? 0).toString().padStart(2, "0"), icon: <Users />, bg: "bg-blue-500" },
      { label: "Bookings", count: (data.totalBookings ?? 0).toString().padStart(2, "0"), icon: <TrendingUp />, bg: "bg-green-500" },
      { label: "Revenue ($)", count: (data.totalRevenue ?? 0).toFixed(0).padStart(2, "0"), icon: <DollarSign />, bg: "bg-yellow-500" },
    ];
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      <div className="h-60 w-full bg-linear-to-r from-violet-600 via-indigo-600 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-5 -mt-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Profile Overview */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-none shadow-2xl rounded-[2.5rem] bg-white overflow-hidden">
              <CardContent className="p-8 text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-32 h-32 rounded-[2rem] bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-4xl font-black text-white shadow-xl shadow-violet-200 overflow-hidden">
                    {user.avatar ? (
                      <img
                        src={user.avatar.startsWith("http") ? user.avatar : `${process.env.NEXT_PUBLIC_BASE_URL?.replace("/api/v1", "")}${user.avatar}`}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      user.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-green-500 border-4 border-white w-8 h-8 rounded-full shadow-sm" />
                </div>

                <h2 className="text-2xl font-black text-gray-900 mb-1">{user.name}</h2>
                <p className="text-gray-500 font-medium mb-4">{user.email}</p>

                <Badge
                  className={`px-4 py-1.5 rounded-xl border-none font-bold uppercase tracking-wider ${
                    user.role === "ADMIN"
                      ? "bg-red-100 text-red-600"
                      : user.role === "TUTOR"
                      ? "bg-indigo-100 text-indigo-600"
                      : "bg-violet-100 text-violet-600"
                  }`}
                >
                  {user.role}
                </Badge>

                <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-100">
                  <div className="text-center">
                    <p className="text-xs font-bold text-gray-400 uppercase mb-1">Status</p>
                    <p className={`text-sm font-black ${user.isBanned ? "text-red-500" : "text-green-500"}`}>
                      {user.isBanned ? "Banned" : "Active"}
                    </p>
                  </div>
                  <div className="text-center border-l border-gray-100">
                    <p className="text-xs font-bold text-gray-400 uppercase mb-1">Joined</p>
                    <p className="text-sm font-black text-gray-900">{joinedDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tutor extra info card */}
            {user.role === "TUTOR" && tutorProfile && (
              <Card className="border-none shadow-lg rounded-3xl bg-white">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-black text-gray-800 text-lg">Tutor Details</h3>
                  {tutorProfile.expertise && (
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600 mt-0.5">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Expertise</p>
                        <p className="text-sm font-bold text-gray-700">{tutorProfile.expertise}</p>
                      </div>
                    </div>
                  )}
                  {tutorProfile.hourlyRate !== undefined && (
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-green-50 rounded-xl text-green-600 mt-0.5">
                        <DollarSign className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Hourly Rate</p>
                        <p className="text-sm font-bold text-gray-700">${tutorProfile.hourlyRate}/hr</p>
                      </div>
                    </div>
                  )}
                  {tutorProfile.experience !== undefined && (
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-yellow-50 rounded-xl text-yellow-600 mt-0.5">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Experience</p>
                        <p className="text-sm font-bold text-gray-700">{tutorProfile.experience} years</p>
                      </div>
                    </div>
                  )}
                  {tutorProfile.bio && (
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Bio</p>
                      <p className="text-sm text-gray-600 leading-relaxed">{tutorProfile.bio}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column: Detailed Info & Stats */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: <User />, label: "Full Name", value: user.name },
                { icon: <Mail />, label: "Email Address", value: user.email },
                { icon: <ShieldCheck />, label: "Account Role", value: user.role },
                { icon: <Calendar />, label: "Member Since", value: joinedDate },
              ].map((info, idx) => (
                <Card key={idx} className="border-none shadow-lg shadow-gray-200/50 rounded-3xl bg-white p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-violet-50 rounded-2xl text-violet-600">{info.icon}</div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{info.label}</p>
                      <p className="text-lg font-black text-gray-800">{info.value}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="border-none shadow-2xl rounded-[2.5rem] bg-white overflow-hidden p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-gray-900">{activityTitle}</h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl font-bold border-violet-200 text-violet-600"
                  asChild
                >
                  <Link href="/profile/edit">
                    <Edit3 className="w-4 h-4 mr-2" /> Edit Profile
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="relative group p-6 rounded-[2rem] bg-gray-50 border border-gray-100 overflow-hidden transition-all hover:bg-white hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className={`absolute top-0 right-0 w-20 h-20 ${stat.bg} opacity-5 rounded-bl-full`} />
                    <div className={`mb-4 w-12 h-12 flex items-center justify-center rounded-2xl text-white ${stat.bg} shadow-lg shadow-gray-200`}>
                      {stat.icon}
                    </div>
                    <p className="text-3xl font-black text-gray-900 mb-1">{stat.count}</p>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
