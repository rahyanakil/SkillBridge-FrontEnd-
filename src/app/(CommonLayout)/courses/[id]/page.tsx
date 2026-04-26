import CourseDetails from "@/components/modules/course/CourseDetails";
import { getSingleCourse } from "@/services/course";
import { getCompletedCourses } from "@/services/Dashboard/studentActions";
import { getUser } from "@/services/auth";

export const dynamicParams = true;
export const revalidate = 300;

export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/courses`);
    if (!res.ok) return [];
    const result = await res.json();
    return (result?.data ?? []).map((c: { id: string }) => ({ id: c.id }));
  } catch {
    return [];
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getUser();
  const isStudent = user?.role === "STUDENT";

  const [courseRes, completedRes] = await Promise.all([
    getSingleCourse(id),
    isStudent ? getCompletedCourses() : Promise.resolve(null),
  ]);

  const course = courseRes?.data;
  const userRole = user?.role as string | undefined;

  let completedBookingId: string | null = null;
  let hasReviewed = false;

  if (isStudent) {
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
