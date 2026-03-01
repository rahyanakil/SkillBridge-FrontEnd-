import CourseCard from "@/components/modules/course/Course";
import CategorySection from "@/components/modules/home/CategorySection";
import { HeroCarousel } from "@/components/modules/home/Hero";
import { ReviewSection } from "@/components/modules/home/ReviewSection";
import { getAllCourse } from "@/services/course";
import { getAllReviews } from "@/services/reviews/reviewActions";

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
  // এপিআই থেকে রিভিউ ডাটা নিয়ে আসা
  const reviewsData = await getAllReviews();

  // ডাটা যদি কোনো অবজেক্টের ভেতর থাকে (যেমন: { success: true, data: [...] })
  const reviews = reviewsData?.data || reviewsData || [];

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
      <ReviewSection reviews={reviews} />
    </div>
  );
}
