import CourseDetails from "@/components/modules/course/CourseDetails";
import { getSingleCourse } from "@/services/course";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await getSingleCourse(id);
  return (
    <div>
      <CourseDetails course={data} />
    </div>
  );
}
