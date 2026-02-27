import CourseCard from "@/components/modules/course/Course";
import { getAllCourse } from "@/services/course";
import { ICourse } from "../page";

const Page = async () => {
  const { data } = await getAllCourse();
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((course: ICourse) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};
export default Page;
