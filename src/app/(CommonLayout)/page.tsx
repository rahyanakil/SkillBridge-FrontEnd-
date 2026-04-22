import CourseCard from "@/components/modules/course/Course";
import CategorySection from "@/components/modules/home/CategorySection";
import { HeroCarousel } from "@/components/modules/home/Hero";
import { ReviewSection } from "@/components/modules/home/ReviewSection";
import TutorSection from "@/components/modules/tutor/TutorSection";
import { getAllCourse } from "@/services/course";
import { getAllReviews } from "@/services/reviews/reviewActions";

export interface ICourse {
  id: string;
  title: string;
  description: string;
  price: number;
  avgRating?: number;
  reviewCount?: number;
  tutor: {
    userId?: string;
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
  const [{ data }, reviewsData] = await Promise.all([getAllCourse(), getAllReviews()]);
  const reviews = Array.isArray(reviewsData) ? reviewsData : [];

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
      <CategorySection />
      <TutorSection />
      <ReviewSection reviews={reviews} />
    </div>
  );
}
