import CourseCard from "@/components/modules/course/Course";
import { getAllCourse } from "@/services/course";
import { ICourse } from "../page";

const Page = async () => {
  // ১. ডাটা ফেচ করা হচ্ছে
  const response = await getAllCourse();

  // ২. ডিফেন্সিভ চেকিং: যদি রেসপন্স না থাকে বা ডাটা না থাকে
  const courses = response?.data || [];

  return (
    <div className="container mx-auto py-12 px-4">
      {/* ৩. চেক করা হচ্ছে লুপ চালানোর আগে */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.length > 0 ? (
          courses.map((course: ICourse) => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-gray-500 text-lg font-medium">
              No courses found at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;

// import CourseCard from "@/components/modules/course/Course";
// import { getAllCourse } from "@/services/course";
// import { ICourse } from "../page";

// const Page = async () => {
//   const { data } = await getAllCourse();
//   return (
//     <div className="container mx-auto py-12 px-4">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {data.map((course: ICourse) => (
//           <CourseCard key={course.id} course={course} />
//         ))}
//       </div>
//     </div>
//   );
// };
// export default Page;
