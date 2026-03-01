/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ChevronRight, LayoutGrid } from "lucide-react";
import Link from "next/link";

export default function CategoryCard({ category }: { category: any }) {
  return (
    <Link href={`/courses?category=${category.id}`}>
      <div className="group bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-100/50 hover:shadow-violet-200/50 hover:border-violet-200 transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden h-full">
        {/* Decorative background circle */}
        <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-violet-50 rounded-full group-hover:scale-[3] transition-transform duration-700 ease-in-out opacity-50" />

        {/* Icon Container */}
        <div className="relative z-10 w-16 h-16 bg-violet-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:rotate-12 transition-transform shadow-lg shadow-violet-200">
          {/* ব্যাকএন্ডে আইকন না থাকলে ডিফল্ট আইকন */}
          <LayoutGrid className="w-8 h-8" />
        </div>

        {/* Text Content */}
        <div className="relative z-10">
          <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-violet-600 transition-colors uppercase tracking-tight">
            {category.name}
          </h3>
          <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6">
            Explore our expert-led courses in {category.name}.
          </p>

          <div className="inline-flex items-center gap-1 text-xs font-black text-violet-600 uppercase tracking-widest group-hover:gap-3 transition-all">
            Browse Courses <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
