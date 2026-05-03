import { AnimatedSectionHeader } from "@/components/modules/home/AnimatedSectionHeader";
import { StatsSection } from "@/components/modules/home/StatsSection";
import CategorySection from "@/components/modules/home/CategorySection";
import { HeroCarousel } from "@/components/modules/home/HeroSection";
import { ReviewSection } from "@/components/modules/home/ReviewSection";
import TutorSection from "@/components/modules/tutor/TutorSection";
import { AnimatedCourseGrid } from "@/components/modules/course/AnimatedCourseGrid";
import HowItWorksSection from "@/components/modules/home/HowItWorksSection";
import FAQSection from "@/components/modules/home/FAQSection";
import NewsletterSection from "@/components/modules/home/NewsletterSection";
import CTABannerSection from "@/components/modules/home/CTABannerSection";
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
  const [{ data }, reviewsData] = await Promise.all([getAllCourse({ limit: 4 }), getAllReviews()]);
  const reviews = Array.isArray(reviewsData) ? reviewsData : [];
  const courses: ICourse[] = Array.isArray(data) ? data : [];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
      {/* 1 — Hero */}
      <HeroCarousel />

      {/* 2 — Stats */}
      <StatsSection />

      {/* 3 — How It Works */}
      <HowItWorksSection />

      {/* 4 — Featured Courses */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 20%, rgba(139,92,246,0.06) 0%, transparent 60%)",
          }}
        />
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedSectionHeader
            badge="Handpicked For You"
            headline="Featured"
            highlight="Courses"
            description="Start with our most popular courses, curated by expert tutors and loved by thousands of students."
          />
          <div className="mt-10">
            <AnimatedCourseGrid courses={courses} />
          </div>
        </div>
      </section>

      {/* 5 — Categories */}
      <CategorySection />

      {/* 6 — Top Tutors */}
      <TutorSection />

      {/* 7 — Testimonials / Reviews */}
      <ReviewSection reviews={reviews} />

      {/* 8 — FAQ */}
      <FAQSection />

      {/* 9 — Newsletter */}
      <NewsletterSection />

      {/* 10 — CTA Banner */}
      <CTABannerSection />
    </div>
  );
}
