import CourseDetails from "@/components/modules/course/CourseDetails";
import { getSingleCourse } from "@/services/course";
import { getCompletedCourses } from "@/services/Dashboard/studentActions";
import { getUser } from "@/services/auth";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [courseRes, user, completedRes] = await Promise.all([
    getSingleCourse(id),
    getUser(),
    getCompletedCourses(),
  ]);
  const course = courseRes?.data;
  const userRole = (user as any)?.role as string | undefined;

  let completedBookingId: string | null = null;
  let hasReviewed = false;

  if (userRole === "STUDENT") {
    const completedBookings = Array.isArray(completedRes?.data) ? completedRes.data : [];
    const match = completedBookings.find((b: any) => b.courseId === id);
    if (match) {
      completedBookingId = match.id;
      hasReviewed = !!match.review;
    }
  }

  return (
    <div>
      <CourseDetails
        course={course}
        userRole={userRole ?? null}
        completedBookingId={completedBookingId}
        hasReviewed={hasReviewed}
      />
    </div>
  );
}
