/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getAllPublicTutors } from "@/services/tutor/tutor";
// import { getAllPublicTutors } from "@/services/Landing/tutorActions";
import {
  ArrowUpRight,
  BookOpen,
  GraduationCap,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function TutorSection() {
  const [tutors, setTutors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTutors = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getAllPublicTutors();
      if (result.success) {
        // ব্যাকএন্ডের 'data' অ্যারে থেকে টিউটরদের নিচ্ছি
        setTutors(result.data);
      }
    } catch (error) {
      console.error("Error fetching tutors:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTutors();
  }, [fetchTutors]);

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <Loader2 className="animate-spin text-primary w-10 h-10" />
      </div>
    );
  }

  return (
    <section className="py-24 bg-base-100">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center lg:text-left">
          <h2 className="text-5xl font-black tracking-tighter italic uppercase">
            Our Elite <span className="text-primary">Faculty</span>
          </h2>
          <p className="text-base-content/50 mt-2 font-medium">
            Real experts. Real results. Directly for you.
          </p>
        </div>

        {/* টিউটর গ্রিড - এখানে ম্যাপ করা হয়েছে */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {tutors && tutors.length > 0 ? (
            tutors.map((tutor) => (
              <div
                key={tutor.id}
                className="group relative bg-white border border-base-200 rounded-[3rem] p-8 transition-all hover:shadow-2xl hover:-translate-y-2"
              >
                {/* প্রোফাইল হেডার */}
                <div className="flex items-start justify-between mb-8">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-[2.5rem] overflow-hidden ring-4 ring-base-100 shadow-xl">
                      <img
                        src={
                          tutor.user?.avatar ||
                          `https://api.dicebear.com/7.x/avataaars/svg?seed=${tutor.user?.name}`
                        }
                        alt={tutor.user?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-primary text-white p-1.5 rounded-xl">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black opacity-30 uppercase tracking-widest">
                      Rate
                    </p>
                    <p className="text-3xl font-black text-primary">
                      ${tutor.hourlyRate}
                      <span className="text-sm opacity-50">/hr</span>
                    </p>
                  </div>
                </div>

                {/* টিউটর ইনফো */}
                <div className="mb-6">
                  <h3 className="text-2xl font-black tracking-tight group-hover:text-primary transition-colors">
                    {tutor.user?.name}
                  </h3>
                  <p className="text-[10px] font-black text-base-content/40 uppercase tracking-[0.2em] mt-1 mb-4">
                    {tutor.expertise}
                  </p>
                  <p className="text-sm text-base-content/60 italic font-medium line-clamp-2 leading-relaxed">
                    &quot;{tutor.bio}&quot;
                  </p>
                </div>

                {/* কোর্সের লিস্ট (আপনার JSON অনুযায়ী) */}
                <div className="bg-base-200/50 rounded-2xl p-4 mb-6">
                  <p className="text-[10px] font-black opacity-40 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <BookOpen className="w-3 h-3" /> Active Courses (
                    {tutor.courses?.length || 0})
                  </p>
                  <div className="space-y-1">
                    {tutor.courses?.slice(0, 2).map((course: any) => (
                      <p key={course.id} className="text-xs font-bold truncate">
                        • {course.title}
                      </p>
                    ))}
                  </div>
                </div>

                {/* কার্ড ফুটার */}
                <div className="flex items-center justify-between pt-6 border-t border-base-100">
                  <div className="flex items-center gap-2 font-black text-[11px] opacity-40 uppercase">
                    <GraduationCap className="w-4 h-4" /> {tutor.experience} Yrs
                    Exp
                  </div>
                  <Link
                    href={`/tutors/${tutor.userId}`}
                    className="btn btn-circle btn-primary btn-sm hover:scale-110 transition-transform"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-base-200 rounded-[3rem]">
              <p className="text-xl font-black opacity-20  italic tracking-tighter">
                The Faculty is currently empty.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
