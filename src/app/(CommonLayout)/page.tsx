import CourseCard from "@/components/modules/course/Course";
import { HeroCarousel } from "@/components/modules/home/Hero";
import { getAllCourse } from "@/services/course";

// Interface updated to include all properties
export interface ICourse {
  id: string;
  title: string;
  description: string;
  price: number;
  tutor: {
    user: {
      name: string;
    };
    expertise: string;
  };
  category: {
    name: string;
  };
}

export default async function Home() {
  const { data } = await getAllCourse();

  return (
    <div className="min-h-screen bg-gray-50/50">
      <HeroCarousel />
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.slice(0, 4).map((course: ICourse) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}
