import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Link from "next/link";

const getCourseReviews = async (courseId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/reviews/course/${courseId}`,
    { cache: "no-store" },
  );
  if (!res.ok) return [];
  const result = await res.json();
  return result?.data || [];
};

const getCourse = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/courses/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  const result = await res.json();
  return result?.data || null;
};

export default async function CourseReviewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [course, reviews] = await Promise.all([getCourse(id), getCourseReviews(id)]);

  const avgRating = reviews.length
    ? parseFloat((reviews.reduce((s: number, r: any) => s + r.rating, 0) / reviews.length).toFixed(1))
    : 0;

  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r: any) => r.rating === star).length,
    pct: reviews.length ? Math.round((reviews.filter((r: any) => r.rating === star).length / reviews.length) * 100) : 0,
  }));

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <Link href={`/courses/${id}`} className="text-violet-600 font-bold text-sm mb-6 inline-block hover:underline">
        ← Back to Course
      </Link>

      <h1 className="text-3xl font-black text-slate-900 mb-2">
        {course?.title || "Course"} — Reviews
      </h1>

      {/* Summary */}
      <Card className="rounded-[2rem] border-none shadow-md mb-8">
        <CardContent className="p-8 flex flex-col md:flex-row gap-8 items-center">
          <div className="text-center">
            <p className="text-7xl font-black text-slate-900">{avgRating}</p>
            <div className="flex justify-center gap-0.5 my-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.round(avgRating) ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
              ))}
            </div>
            <p className="text-slate-500 text-sm font-medium">{reviews.length} reviews</p>
          </div>
          <div className="flex-1 space-y-2 w-full">
            {distribution.map(({ star, count, pct }) => (
              <div key={star} className="flex items-center gap-3 text-sm">
                <span className="w-4 text-slate-600 font-bold">{star}</span>
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <div className="flex-1 bg-slate-100 rounded-full h-2">
                  <div className="bg-amber-400 h-2 rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-slate-500 w-8">{count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reviews list */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review: any) => (
            <Card key={review.id} className="rounded-[2rem] border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-violet-100 flex items-center justify-center font-black text-violet-600">
                      {review.Student?.name?.[0] || "S"}
                    </div>
                    <div>
                      <p className="font-black text-slate-800">{review.Student?.name || "Student"}</p>
                      <p className="text-xs text-slate-400">{new Date(review.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
                    ))}
                  </div>
                </div>
                {review.comment && <p className="text-slate-600 leading-relaxed">{review.comment}</p>}
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-400 font-bold italic uppercase tracking-widest">No reviews yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
