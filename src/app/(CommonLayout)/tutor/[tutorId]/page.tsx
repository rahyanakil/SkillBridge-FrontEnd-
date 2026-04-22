import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Briefcase, Clock, Star, Users } from "lucide-react";
import Link from "next/link";

const getTutorProfile = async (tutorId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/tutors/profile/${tutorId}`,
    { cache: "no-store" },
  );
  if (!res.ok) return null;
  const result = await res.json();
  return result?.data || null;
};

export default async function TutorProfilePage({ params }: { params: Promise<{ tutorId: string }> }) {
  const { tutorId } = await params;
  const tutor = await getTutorProfile(tutorId);

  if (!tutor) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-2xl font-black text-slate-800">Tutor not found</h2>
        <Link href="/courses" className="text-violet-600 mt-4 inline-block font-bold">← Browse Courses</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-5xl">
      {/* Hero */}
      <Card className="rounded-[3rem] border-none shadow-xl mb-10 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-violet-600 to-indigo-600" />
        <CardContent className="p-8 -mt-16">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-28 h-28 rounded-3xl bg-white shadow-xl flex items-center justify-center text-4xl font-black text-violet-600 border-4 border-white">
              {tutor.user?.avatar ? (
                <img src={tutor.user.avatar.startsWith("http") ? tutor.user.avatar : `${process.env.NEXT_PUBLIC_BASE_URL?.replace("/api/v1", "")}${tutor.user.avatar}`} alt={tutor.user.name} className="w-full h-full object-cover rounded-3xl" />
              ) : (
                tutor.user?.name?.[0]?.toUpperCase()
              )}
            </div>
            <div className="flex-1 pt-10 md:pt-0 mt-4">
              <h1 className="text-3xl font-black text-slate-900">{tutor.user?.name}</h1>
              <p className="text-violet-600 font-bold mt-1">{tutor.expertise}</p>
              <div className="flex flex-wrap gap-4 mt-4 text-sm text-slate-600">
                <span className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-400 fill-amber-400" />{tutor.avgRating ?? 0} avg rating</span>
                <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" />{tutor.courses?.length ?? 0} courses</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{tutor.experience} yrs experience</span>
                <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" />${tutor.hourlyRate}/hr</span>
              </div>
            </div>
          </div>
          {tutor.bio && (
            <p className="mt-6 text-slate-600 leading-relaxed border-t pt-6">{tutor.bio}</p>
          )}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Courses */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-2xl font-black text-slate-900">Courses by {tutor.user?.name}</h2>
          {tutor.courses?.length > 0 ? (
            tutor.courses.map((course: any) => (
              <Link href={`/courses/${course.id}`} key={course.id}>
                <Card className="rounded-[2rem] border-none shadow-md hover:shadow-xl transition-all cursor-pointer group mb-4">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <h3 className="font-black text-slate-800 group-hover:text-violet-600 transition-colors">{course.title}</h3>
                      <p className="text-sm text-slate-500 mt-1 line-clamp-2">{course.description}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <Badge className="bg-violet-50 text-violet-700 border-none">{course.category?.name}</Badge>
                        <span className="flex items-center gap-1 text-sm text-amber-500">
                          <Star className="w-3 h-3 fill-amber-400" />{course.avgRating ?? 0} ({course.reviewCount ?? 0})
                        </span>
                      </div>
                    </div>
                    <p className="text-2xl font-black text-slate-900 ml-4">${course.price}</p>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <p className="text-slate-400 italic">No courses yet.</p>
          )}
        </div>

        {/* Reviews */}
        <div>
          <h2 className="text-2xl font-black text-slate-900 mb-4">Reviews</h2>
          {tutor.reviews?.length > 0 ? (
            tutor.reviews.slice(0, 5).map((review: any) => (
              <Card key={review.id} className="rounded-[1.5rem] border-none shadow-sm mb-4">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-xl bg-violet-100 flex items-center justify-center text-xs font-black text-violet-600">
                      {review.Student?.name?.[0]}
                    </div>
                    <span className="font-bold text-sm text-slate-700">{review.Student?.name}</span>
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
                    ))}
                  </div>
                  {review.comment && <p className="text-sm text-slate-600 italic">"{review.comment}"</p>}
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-slate-400 italic text-sm">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
