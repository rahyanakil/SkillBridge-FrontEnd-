import StudentDashboard from "@/components/modules/student/StudentDashboard";
import { getCompletedCourses, getRecommendations, getStudentBookings } from "@/services/Dashboard/studentActions";
import { getAllCourse } from "@/services/course";

export default async function StudentDashboardPage() {
  const [bookRes, compRes, recRes, allCoursesRes] = await Promise.all([
    getStudentBookings(),
    getCompletedCourses(),
    getRecommendations(),
    getAllCourse(),
  ]);

  const bookings = Array.isArray(bookRes?.data) ? bookRes.data : [];
  const completed = Array.isArray(compRes?.data) ? compRes.data : [];
  const recs = Array.isArray(recRes?.data) ? recRes.data : [];
  const isFallbackRecs = recs.length === 0;
  const recommendations = isFallbackRecs
    ? (Array.isArray(allCoursesRes?.data) ? allCoursesRes.data.slice(0, 6) : [])
    : recs;

  return (
    <StudentDashboard
      initialBookings={bookings}
      initialCompleted={completed}
      initialRecommendations={recommendations}
      isFallbackRecs={isFallbackRecs}
    />
  );
}
