/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AddReviewForm } from "@/components/review/AddReviewForm";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  Globe,
  ShieldCheck,
  Star,
  User,
} from "lucide-react";
import Link from "next/link";
import { CourseBookingModal } from "./CourseBookingModal";

interface IProps {
  course: any;
  userRole?: string | null;
  completedBookingId?: string | null;
  hasReviewed?: boolean;
}

export default function CourseDetailsPage({
  course,
  userRole,
  completedBookingId,
  hasReviewed,
}: IProps) {
  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  const avgRating = course.avgRating ?? 0;
  const reviewCount = course.reviewCount ?? 0;

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      <div className="relative w-full bg-gradient-to-br from-violet-700 via-violet-600 to-indigo-800 py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />

        <div className="container mx-auto px-5 relative z-10 text-white">
          <div className="max-w-4xl">
            <Badge className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-md px-4 py-1.5 mb-6 uppercase tracking-wider font-bold">
              {course.category?.name || "Development"}
            </Badge>
            <h1 className="text-4xl md:text-7xl font-black leading-[1.1] mb-8 tracking-tighter">
              {course.title}
            </h1>
            <div className="flex flex-wrap items-center gap-8 text-white/90">
              <div className="flex items-center gap-2.5">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-lg">
                  {avgRating > 0 ? `${avgRating} (${reviewCount} review${reviewCount !== 1 ? "s" : ""})` : "No reviews yet"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span className="font-bold">By {course.tutor?.user?.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                <span>Online Learning</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-5 -mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-10">
            {/* Description */}
            <Card className="border-none shadow-2xl rounded-[2.5rem] bg-white p-10">
              <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                <div className="p-2 bg-violet-100 rounded-xl text-violet-600">
                  <BookOpen className="w-6 h-6" />
                </div>
                Description
              </h2>
              <p className="text-gray-600 text-xl leading-relaxed">{course.description}</p>
            </Card>

            {/* Instructor */}
            <Link href={`/tutor/${course.tutor?.userId}`}>
              <Card className="border-none shadow-2xl rounded-[2.5rem] bg-white p-10 hover:shadow-violet-100 hover:border-violet-200 border-2 border-transparent transition-all cursor-pointer">
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                  <div className="w-24 h-24 rounded-3xl bg-violet-600 flex items-center justify-center shrink-0 shadow-lg">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  <div className="text-center md:text-left">
                    <p className="text-xs font-black text-violet-400 uppercase tracking-widest mb-1">Your Instructor</p>
                    <h3 className="text-3xl font-black text-gray-900 hover:text-violet-600 transition-colors">
                      {course.tutor?.user?.name}
                    </h3>
                    <p className="text-gray-500 font-bold my-3 italic">
                      {course.tutor?.bio || "Expert in modern web technologies."}
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                      <Badge className="bg-violet-50 text-violet-600 border-none font-bold px-3 py-1">
                        {course.tutor?.expertise || "Teacher"}
                      </Badge>
                      <Badge className="bg-indigo-50 text-indigo-600 border-none font-bold px-3 py-1">
                        Professional Tutor
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>

            {/* Reviews section */}
            {course.reviews && course.reviews.length > 0 && (
              <Card className="border-none shadow-2xl rounded-[2.5rem] bg-white p-10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black flex items-center gap-3">
                    <div className="p-2 bg-amber-100 rounded-xl text-amber-600">
                      <Star className="w-6 h-6" />
                    </div>
                    Reviews
                  </h2>
                  <Link
                    href={`/courses/${course.id}/reviews`}
                    className="text-sm font-bold text-violet-600 hover:underline"
                  >
                    See all {reviewCount} reviews →
                  </Link>
                </div>
                <div className="space-y-4">
                  {course.reviews.slice(0, 3).map((review: any) => (
                    <div key={review.id} className="p-5 bg-gray-50 rounded-2xl">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center text-xs font-black text-violet-600">
                          {review.Student?.name?.[0] || "S"}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-gray-800">{review.Student?.name || "Student"}</p>
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
                            ))}
                          </div>
                        </div>
                      </div>
                      {review.comment && <p className="text-sm text-gray-600 italic ml-12">"{review.comment}"</p>}
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Add Review (only for students with completed booking and no prior review) */}
            {userRole === "STUDENT" && completedBookingId && !hasReviewed && (
              <AddReviewForm bookingId={completedBookingId} />
            )}
          </div>

          {/* Right Column: Sticky Sidebar */}
          <div className="lg:col-start-3">
            <div className="sticky top-24">
              <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white border-t-8 border-violet-600 p-10 space-y-8">
                <div>
                  <p className="text-gray-400 font-bold uppercase text-xs tracking-widest mb-1">
                    Total Investment
                  </p>
                  <h2 className="text-5xl font-black text-gray-900 tracking-tighter">
                    ${course.price}
                  </h2>
                  {avgRating > 0 && (
                    <div className="flex items-center gap-1.5 mt-2">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-bold text-gray-600">{avgRating} · {reviewCount} reviews</span>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {userRole !== "TUTOR" && userRole !== "ADMIN" && (
                    <CourseBookingModal
                      currentCourseId={course.id}
                      courseTitle={course.title}
                    />
                  )}
                  {!userRole && (
                    <p className="text-center text-xs text-gray-400 font-medium">
                      <Link href="/login" className="text-violet-600 font-bold hover:underline">Login</Link> to book this course
                    </p>
                  )}
                  <div className="flex items-center justify-center gap-2 text-green-600 text-xs font-bold uppercase">
                    <ShieldCheck className="w-4 h-4" />
                    30-Day Money-Back Guarantee
                  </div>
                </div>

                <div className="space-y-5 border-t border-gray-100 pt-8">
                  <h4 className="font-black text-gray-900 text-sm uppercase tracking-wider">
                    Course Includes:
                  </h4>
                  {[
                    { icon: <Clock className="w-4 h-4" />, text: "Lifetime access" },
                    { icon: <Globe className="w-4 h-4" />, text: "Online learning" },
                    { icon: <Award className="w-4 h-4" />, text: "Verified Certificate" },
                    { icon: <CheckCircle2 className="w-4 h-4" />, text: "Practice Projects" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 text-gray-600 font-medium">
                      <div className="text-violet-600">{item.icon}</div>
                      <span className="text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
