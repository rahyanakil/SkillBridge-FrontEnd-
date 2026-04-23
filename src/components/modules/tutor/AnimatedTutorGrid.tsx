/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, GraduationCap, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const BACKEND_URL = process.env.NEXT_PUBLIC_BASE_URL?.replace("/api/v1", "") ?? "";

function TutorCard({ tutor, index }: { tutor: any; index: number }) {
  const avatarSrc = tutor.user?.avatar
    ? tutor.user.avatar.startsWith("http") ? tutor.user.avatar : `${BACKEND_URL}${tutor.user.avatar}`
    : `https://api.dicebear.com/7.x/avataaars/svg?seed=${tutor.user?.name}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.12 }}
      whileHover={{ y: -8 }}
      className="group relative bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-lg shadow-slate-100/50 hover:shadow-2xl hover:shadow-violet-100/40 hover:border-violet-100 transition-all duration-500 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50/0 to-indigo-50/0 group-hover:from-violet-50/60 group-hover:to-indigo-50/30 rounded-[2.5rem] transition-all duration-500" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-7">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-white shadow-xl">
              <Image src={avatarSrc} alt={tutor.user?.name ?? "Tutor"} width={80} height={80} unoptimized className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-1.5 -right-1.5 bg-violet-600 text-white p-1.5 rounded-xl shadow-md">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Rate</p>
            <p className="text-2xl font-black text-violet-600 leading-none">
              ${tutor.hourlyRate}<span className="text-sm text-slate-400 font-bold">/hr</span>
            </p>
          </div>
        </div>

        <div className="mb-5">
          <h3 className="text-xl font-black tracking-tight text-slate-900 group-hover:text-violet-600 transition-colors">
            {tutor.user?.name}
          </h3>
          <p className="text-[10px] font-black text-violet-500 uppercase tracking-[0.2em] mt-0.5 mb-3">
            {tutor.expertise}
          </p>
          <p className="text-sm text-slate-500 italic font-medium line-clamp-2 leading-relaxed">
            &quot;{tutor.bio}&quot;
          </p>
        </div>

        {tutor.courses?.length > 0 && (
          <div className="bg-slate-50 rounded-2xl p-4 mb-5 border border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <BookOpen className="w-3 h-3" /> {tutor.courses.length} Active {tutor.courses.length === 1 ? "Course" : "Courses"}
            </p>
            <div className="space-y-1">
              {tutor.courses.slice(0, 2).map((course: any) => (
                <p key={course.id} className="text-xs font-bold text-slate-700 truncate">→ {course.title}</p>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-5 border-t border-slate-100">
          <div className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-wide">
            <GraduationCap className="w-4 h-4" /> {tutor.experience} Yrs Exp
          </div>
          <Link
            href={`/tutor/${tutor.userId}`}
            className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-700 text-white text-xs font-black px-4 py-2.5 rounded-xl transition-all group/btn shadow-md shadow-violet-200"
          >
            View Profile
            <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export function AnimatedTutorGrid({ tutors }: { tutors: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
      {tutors.length > 0 ? (
        tutors.slice(0, 6).map((tutor, index) => (
          <TutorCard key={tutor.id} tutor={tutor} index={index} />
        ))
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="col-span-full text-center py-20"
        >
          <p className="text-xl font-black text-slate-300 italic">No tutors available yet.</p>
        </motion.div>
      )}
    </div>
  );
}
