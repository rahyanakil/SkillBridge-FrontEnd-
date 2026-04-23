/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen, Layers } from "lucide-react";
import Link from "next/link";

const gradients = [
  "from-violet-500 to-indigo-600",
  "from-indigo-500 to-blue-600",
  "from-purple-500 to-pink-600",
  "from-blue-500 to-cyan-600",
  "from-emerald-500 to-teal-600",
  "from-orange-500 to-rose-600",
];

export default function CategoryCard({
  category,
  index = 0,
}: {
  category: any;
  index?: number;
}) {
  const courseCount = category.courses?.length ?? 0;
  const gradient = gradients[index % gradients.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      whileHover={{ y: -8 }}
    >
      <Link href={`/courses?category=${category.id}`} className="block h-full">
        <div className="group relative bg-white p-7 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-100/60 hover:shadow-2xl hover:shadow-violet-100/60 transition-all duration-500 flex flex-col items-center text-center overflow-hidden h-full">
          {/* Animated background gradient on hover */}
          <div
            className={`absolute inset-0 bg-linear-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-[2rem]`}
          />

          {/* Radial glow */}
          <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-violet-100 opacity-0 group-hover:opacity-60 group-hover:scale-150 transition-all duration-700" />

          {/* Icon */}
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`relative z-10 w-16 h-16 bg-linear-to-br ${gradient} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}
          >
            <Layers className="w-7 h-7" />
          </motion.div>

          {/* Content */}
          <div className="relative z-10 flex flex-col flex-1 w-full">
            <h3 className="text-lg font-black text-slate-900 mb-2 group-hover:text-violet-600 transition-colors uppercase tracking-tight">
              {category.name}
            </h3>
            <p className="text-slate-500 text-sm font-medium leading-relaxed mb-5 flex-1">
              Explore expert-led courses in {category.name} and master in-demand
              skills.
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                <BookOpen className="w-3.5 h-3.5" />
                {courseCount} {courseCount === 1 ? "course" : "courses"}
              </div>
              <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-violet-50 group-hover:bg-violet-600 transition-colors duration-300">
                <ArrowUpRight className="w-4 h-4 text-violet-400 group-hover:text-white transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
