import { getProfile } from "@/services/profile";
import { getStudentBookings, getCompletedCourses } from "@/services/Dashboard/studentActions";
import { getAdminStats } from "@/services/Dashboard/adminActions";
import { getTutorEarnings, getMyTutorProfile } from "@/services/Dashboard/tutorActions";
import { Award, BookOpen, DollarSign, Star, TrendingUp, Users } from "lucide-react";
import { ReactElement } from "react";
import ProfileView from "./ProfileView";

const ProfilePage = async () => {
  const user = await getProfile();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white/50 font-bold">
        Profile not found.
      </div>
    );
  }

  const joinedDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  let activityTitle = "Activity";
  let stats: { label: string; count: string; icon: ReactElement; bg: string; glow: string }[] = [];
  let tutorProfile: { bio?: string; expertise?: string; hourlyRate?: number; experience?: number } | null = null;

  if (user.role === "STUDENT") {
    activityTitle = "Learning Activity";
    const [bookRes, compRes] = await Promise.all([getStudentBookings(), getCompletedCourses()]);
    const enrolled = Array.isArray(bookRes?.data) ? bookRes.data.length : 0;
    const completed = Array.isArray(compRes?.data) ? compRes.data.length : 0;
    stats = [
      { label: "Enrolled",    count: enrolled.toString().padStart(2, "0"),                    icon: <BookOpen />,   bg: "bg-blue-600",    glow: "shadow-blue-500/30" },
      { label: "Completed",   count: completed.toString().padStart(2, "0"),                   icon: <Award />,      bg: "bg-emerald-600", glow: "shadow-emerald-500/30" },
      { label: "In Progress", count: Math.max(0, enrolled - completed).toString().padStart(2, "0"), icon: <Star />, bg: "bg-violet-600",  glow: "shadow-violet-500/30" },
    ];
  } else if (user.role === "TUTOR") {
    activityTitle = "Teaching Activity";
    const [earningsRes, profileRes] = await Promise.all([getTutorEarnings(), getMyTutorProfile()]);
    const earnings = earningsRes?.data ?? earningsRes;
    tutorProfile = profileRes?.data ?? null;
    stats = [
      { label: "Courses",     count: (earnings?.byCourse?.length ?? 0).toString().padStart(2, "0"),     icon: <BookOpen />,    bg: "bg-indigo-600",  glow: "shadow-indigo-500/30" },
      { label: "Sessions",    count: (earnings?.totalSessions ?? 0).toString().padStart(2, "0"),         icon: <Award />,       bg: "bg-emerald-600", glow: "shadow-emerald-500/30" },
      { label: "Earned ($)",  count: (earnings?.totalEarnings ?? 0).toFixed(0).padStart(2, "0"),         icon: <DollarSign />,  bg: "bg-amber-600",   glow: "shadow-amber-500/30" },
    ];
  } else if (user.role === "ADMIN") {
    activityTitle = "Platform Stats";
    const statsRes = await getAdminStats();
    const data = statsRes?.data ?? {};
    stats = [
      { label: "Users",       count: (data.totalUsers ?? 0).toString().padStart(2, "0"),     icon: <Users />,       bg: "bg-blue-600",    glow: "shadow-blue-500/30" },
      { label: "Bookings",    count: (data.totalBookings ?? 0).toString().padStart(2, "0"),  icon: <TrendingUp />,  bg: "bg-violet-600",  glow: "shadow-violet-500/30" },
      { label: "Revenue ($)", count: (data.totalRevenue ?? 0).toFixed(0).padStart(2, "0"),   icon: <DollarSign />,  bg: "bg-emerald-600", glow: "shadow-emerald-500/30" },
    ];
  }

  return (
    <ProfileView
      user={{
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar ?? null,
        isBanned: user.isBanned,
        createdAt: user.createdAt,
      }}
      stats={stats}
      activityTitle={activityTitle}
      tutorProfile={tutorProfile}
      joinedDate={joinedDate}
    />
  );
};

export default ProfilePage;
