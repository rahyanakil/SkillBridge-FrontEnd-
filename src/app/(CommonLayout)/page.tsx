import { AnimatedSectionHeader } from "@/components/modules/home/AnimatedSectionHeader";
import { StatsSection } from "@/components/modules/home/StatsSection";
import CategorySection from "@/components/modules/home/CategorySection";
import { HeroCarousel } from "@/components/modules/home/Hero";
import { ReviewSection } from "@/components/modules/home/ReviewSection";
import TutorSection from "@/components/modules/tutor/TutorSection";
import CourseCard from "@/components/modules/course/Course";
import { AnimatedCourseGrid } from "@/components/modules/course/AnimatedCourseGrid";
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
    user: { name: string };
    expertise: string;
  };
  category: { name: string };
}

export default async function Home() {
  const [{ data }, reviewsData] = await Promise.all([getAllCourse(), getAllReviews()]);
  const reviews = Array.isArray(reviewsData) ? reviewsData : [];
  const courses: ICourse[] = data?.slice(0, 4) ?? [];

  return (
    <div className="min-h-screen">
      <HeroCarousel />
      <StatsSection />

      {/* Featured Courses */}
      <section className="py-28 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 80% 20%, rgba(139,92,246,0.06) 0%, transparent 60%)" }}
        />
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSectionHeader
            badge="Handpicked For You"
            headline="Featured"
            highlight="Courses"
            description="Start with our most popular courses, curated by expert tutors and loved by thousands of students."
          />
          <AnimatedCourseGrid courses={courses} />
        </div>
      </section>

      <CategorySection />
      <TutorSection />
      <ReviewSection reviews={reviews} />
    </div>
  );
}
