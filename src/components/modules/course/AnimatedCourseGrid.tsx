"use client";

import { motion } from "framer-motion";
import CourseCard from "./Course";
import { ICourse } from "@/app/(CommonLayout)/page";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AnimatedCourseGrid({ courses }: { courses: ICourse[] }) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
        {courses.map((course, i) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -6 }}
          >
            <CourseCard course={course} />
          </motion.div>
        ))}
      </div>

      {courses.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center mt-12"
        >
          <Link
            href="/courses"
            className="group flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-2xl font-black transition-all duration-300 shadow-xl shadow-violet-200 hover:shadow-2xl hover:shadow-violet-300 active:scale-95"
          >
            View All Courses
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      )}
    </>
  );
}
